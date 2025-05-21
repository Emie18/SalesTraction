const { Model } = require('../models/Model.js');
const { Student, Account, LanguageStudent, AccountSector, Offer } = Model
const JsonHelper = require("./JsonHelper.js");

exports.create = async (req, res) => {
    try {
        const account = await Account.create({
            type: "student",
            name: req.body.name,
            email: req.body.email,
            password: req.body.pass,
            description : req.body.description ?? "",
            linkedin: req.body.linkedin,
            region : req.body.region ?? "Bretagne"
        });
        const student = await Student.create({
            id_account: account.id,
            surname: req.body.surname,
            school: req.body.school ?? null,
            disponibility: req.body.disponibility
        })
        
        for(const lang of req.body.languages){
            await LanguageStudent.create({
                id: student.id,
                lang: lang,
                natif: false,
            })
        }
        for(const sector of req.body.sector){
            await AccountSector.create({
                id: account.id,
                sector: sector,
            })
        }

        res.status(201).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create student' });
    }
};

exports.getAll = async (req, res) => {
    try{
        const students = await Student.findAll({
            include: [{
                as: "id_account_account",
                model: Account,
                include: [{as: "account_sectors", model: AccountSector }]
            },{as: "language_students", model: LanguageStudent }]
        });

        res.status(200).json(JsonHelper.students(students));
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.get = async (req, res) => {
    try{
        const student = await Student.findOne({
            include: [{
                as: "id_account_account",
                model: Account,
                include: [{as: "account_sectors", model: AccountSector }]
            },{as: "language_students", model: LanguageStudent }],
            where: { id_account: req.query.id }
        });

        if(!student){
            res.status(500).json({error: "Account is not a student"});
        }

        res.status(200).json(JsonHelper.json_student(student));
    }catch(error){
        res.status(500).json({error : error.message});
    }
}


exports.getApplication = async (req, res) => {
    try {
        const student_id = parseInt(req.params.id);

        const applications = await OfferStudent.findAll({ where: { id: student_id } });
        const offer_ids = applications.map(app => app.id_offer);
        const offers = await Offer.findAll(

            {where: { id: { [Op.in]: offer_ids }}}
        );

        return res.status(200).json(offers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete the offer' });
    }
}