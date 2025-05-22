const { Model} = require('../models/Model.js');
const { Offer, OfferDoc, OfferState, OfferStudent, StartUp, Account, AccountSector, Student } = Model
const { Op } = require("sequelize");

const JsonHelper = require("./JsonHelper.js");

exports.update = async (req, res) => {
    try {
        const offer = await Offer.findOne({ where : {id : req.body.id} });

        const auth_id = req.user.id;
        if (auth_id !== offer.id_startup) {
            return res.status(403).json({ error: 'You can only update your offers.' });
        }
        
        if(!offer) return res.status(500).json({ error: 'Failed to update the offer' });
        
        if (req.body.name) offer.name = req.body.name
        if (req.body.product) offer.product = req.body.product
        if (req.body.pitch) offer.pitch = req.body.pitch
        if (req.body.range) offer.range_offer = req.body.range
        if (req.body.commission) offer.commission_offer_commission = req.body.commission
        if (req.body.client) offer.client = req.body.client
        if (req.body.work_mode) offer.work_mode = req.body.work_mode
        await offer.save()

        res.status(201).json(offer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update the offer' });
    }
};

exports.create = async (req, res) => {
    try {
        const auth_id = req.user.id;
        if (auth_id !== req.body.startup) return res.status(403).json({ error: 'You can only create offers with your account.' });

        const startup = await StartUp.findOne({ where : { id_account : req.body.startup}})
        if(!startup) return res.status(500).json({error: "account is not a startup"});

        const offer = await Offer.create({
            name: req.body.name,
            product: req.body.product,
            pitch: req.body.pitch,
            range_offer: req.body.range,
            commission: "",
            commission_offer_commission : req.body.commission,
            client : req.body.client,
            id_startup : startup.id,
            work_mode : req.body.work_mode
        });
        res.status(201).json(offer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create the offer' });
    }
};

exports.delete = async (req, res) => {
    try {
        const auth_id = req.user.id;
        const offer = await Offer.findOne({ 
            where : {id : req.body.id},
            include: [{ as: "id_startup_startup", model: StartUp}] 
        });
        if (auth_id !== offer.id_startup_startup.id_account) {
            return res.status(403).json({ error: 'You can only delete offers with your account.' });
        }

        await OfferDoc.destroy({ where : {id_offer : req.body.id}});
        await OfferStudent.destroy({ where : {id_offer : req.body.id}});
        await Offer.destroy({ where : {id : req.body.id} });
        
        res.status(200).json({deleted : req.body.id});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete the offer' });
    }
};

exports.apply = async (req, res) => {
    try {
        const student = await Student.findOne({where : {id_account : req.body.student}})
        if(!student) return res.status(500).json({ error: 'Account is not a Student' });

        await OfferStudent.create({
            id: student.id,
            id_offer: req.body.offer,
            state: "Waiting",
            motivation: req.body.motivation,
        });
        return res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: 'Failed to apply to the offer' });
    }
}

exports.getApplication = async (req, res) => {
    try {
        const offer_id = parseInt(req.params.id);

        const applications = await OfferStudent.findAll({ where: { id_offer: offer_id } });
        const student_ids = applications.map(app => app.id);
        const students = await Student.findAll({where: { id: { [Op.in]: student_ids }}});

        return res.status(200).json(JsonHelper.students(students));
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete the offer' });
    }
}

exports.getAll = async (req, res) => {
    try{
        //filter : Region, Sector, Commission, WorkMode, Name
        
        const offers = await Offer.findAll({
            include: [{
                as: "id_startup_startup",
                model: StartUp,
                required: true,
                include: [{
                    as: "id_account_account",
                    model: Account,
                    required: !!req.query.region || !!req.query.sector,
                    ...(req.query.region && {where : { region: req.query.region }}),
                    include: [{
                        as: "account_sectors",
                        model: AccountSector,
                        required: !!req.query.sector,
                        ...(req.query.sector && {where : {sector: req.query.sector}})
                    }]
                }]
            }],
            where : {
                ...(req.query.mode && {work_mode: req.query.mode}),
                ...(req.query.commission && {commission_offer_commission: req.query.commission}),
                ...(req.query.name && {name: {[Op.like]: `%${req.query.name}%`}})
            }
            
        });

        const student = await Student.findOne({where : { id_account: req.query.id }})
        if(student){
            const applications = await OfferStudent.findAll({where: {id : student.id}});
            const application_ids = applications.map(app => app.id_offer);

            const offers_json = JsonHelper.offers(offers).map(offer => ({
                ...offer,
                applied: application_ids.includes(offer.id)
            }));

            return res.status(200).json(offers_json);
        }

        res.status(200).json(JsonHelper.offers(offers));
    }catch(error){
        res.status(500).json({error : error.message});
    }
};