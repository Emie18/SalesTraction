const { Model} = require('../models/Model.js');
const startup = require('../models/startup.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { StartUp, Student, Account, AccountSector, Chat, Message} = Model
const { LanguageStudent, OfferStudent, AccountMatch} = Model
const { Offer, OfferDoc } = Model


const SECRET_KEY = process.env.JWT_SECRET


exports.login = async (req, res) => {
    try {
        const { pass, email } = req.body;
        if(!pass || !email){
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const account = await Account.findOne({where: { email: email }});
        if (!account) return res.status(401).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(pass, account.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        
        // Identify user type
        let userType = null;
        const startup = await StartUp.findOne({ where: { id_account: account.id } });
        if (startup) userType = "startup";

        const student = await Student.findOne({ where: { id_account: account.id } });
        if (student) userType = "student";

        if (!userType) return res.status(401).json({ error: 'Invalid credentials' });

        // Create Token
        const token = jwt.sign(
            { id: account.id, type: userType }, SECRET_KEY, { expiresIn: '1d' }
        );

        return res.status(200).json({ token: token, type: userType, id: account.id });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to login', message: err });
    }
};

exports.delete = async (req, res) => {
    try{
        const auth_id = req.user.id;
        if(auth_id !== req.body.id) return res.status(403).json({ error: 'You can only delete your own account.' });

        const students = await Student.findAll({ where: { id_account: req.body.id } });
        const startups = await StartUp.findAll({ where: { id_account: req.body.id } });
        const chats = await Chat.findAll({where : {[Op.or]: [{ id_account_1: req.body.id }, { id_account_2: req.body.id }]}});

        await delete_students(students.map(student => ( student.id )))
        await delete_startups(startups.map(startup => ( startup.id )))
        await delete_chats(chats.map(chat => ( chat.id )), req.body.id)

        await AccountSector.destroy({ where: { id: req.body.id } });
        await Account.destroy({ where: { id: req.body.id } });

        res.status(200).json({deleted : req.body.id});
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

async function delete_chats(chats, account_id){
    if(!Array.isArray(chats) || !chats.length) return
    await Message.destroy({where: {[Op.or]: [
        {id_chat : {[Op.in]: chats}}, {id_account: account_id}
    ]}});
    await Chat.destroy({where : {id : {[Op.in]: chats}}});
}

async function delete_students(students){
    if(!Array.isArray(students) || !students.length) return
    await LanguageStudent.destroy({ where: { id: {[Op.in] : students} } });
    await OfferStudent.destroy({ where: { id: {[Op.in] : students} } });
    await AccountMatch.destroy({ where: { id_student: {[Op.in] : students} } });
    await Student.destroy({ where: { id: {[Op.in] : students} } });
}

async function delete_startups(startups){
    if(!Array.isArray(startups) || !startups.length) return
    const offers = await Offer.findAll({ where: { id_startup: {[Op.in] : startups} } });
    await delete_offers(offers.map(offer => ( offer.id )))

    await AccountMatch.destroy({ where: { id_startup: {[Op.in] : startups} } });
    await StartUp.destroy({ where: { id: {[Op.in] : startups} } });
}

async function delete_offers(offers){
    if(!offers) return
    await OfferDoc.destroy({ where : {id_offer : {[Op.in] : offers}}});
    await OfferStudent.destroy({ where : {id_offer : {[Op.in] : offers}}});
    await Offer.destroy({ where : {id : {[Op.in] : offers}} });
}