const { Model} = require('../models/Model.js');
const startup = require('../models/startup.js');
const { commission } = require('./DataController.js');
const { Offer, OfferDoc, OfferState, OfferStudent, StartUp, Account, AccountSector, Student } = Model
const { Op } = require("sequelize");

exports.update = async (req, res) => {
    try {
        const offer = await Offer.findOne({
            where : {id : req.body.id}
        });
        if(!offer) return res.status(500).json({ error: 'Failed to update the offer' });
        
        if (req.body.name) offer.name = req.body.name
        if (req.body.product) offer.product = req.body.product
        if (req.body.pitch) offer.pitch = req.body.pitch
        if (req.body.range) offer.range_offer = req.body.range
        if (req.body.commission) offer.commission_offer_commission = req.body.commission
        if (req.body.client) offer.client = req.body.client
        if (req.body.startup) offer.id_startup = req.body.startup
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
        await Offer.destroy({ where : {id : req.query.id} });
        res.status(200).json({deleted : req.query.id});
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete the offer' });
    }
};

exports.apply = async (req, res) => {
    try {
        OfferStudent.create({
            id: req.body.student,
            id_offer: req.body.offer,
            state: "Waiting",
            motivation: req.body.motivation,
        })
        return res.status(200);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete the offer' });
    }
}

exports.getApplication = async (req, res) => {
    try {
        const offer_id = parseInt(req.params.id);

        const applications = await OfferStudent.findAll({ where: { id_offer: offer_id } });
        const student_ids = applications.map(app => app.id);
        const offers = await Student.findAll({where: { id: { [Op.in]: student_ids }}});

        return res.status(200).json(offer_list_to_json(offers));
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

        res.status(200).json(offer_list_to_json(offers));
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

function offer_list_to_json(offers){
    var offer_list = []
    for(const offer of offers){
        if(offer.id_startup_startup)
            offer_list.push(form_json(offer))
    }
    return offer_list
}

function form_json(offer) {
    const startup = offer.id_startup_startup
    const account = startup.id_account_account
    const sector = account.account_sectors

    if(!offer || !startup || !account || !sector) return null

    return {
        id : offer.id,
        name: offer.name,
        product: offer.product,
        pitch: offer.pitch,
        range: offer.range_offer,
        commission: offer.commission_offer_commission,
        client:	offer.client,
        work_mode: offer.work_mode,
        startup: {
            account_id: startup.id_account,
            name: account.name,
            email: account.email,
            siret: startup.siret,
            image: account.image,
            description: account.description,
            linkedin: account.linkedin,
            region: account.region,
            sector: sector.map(sector => sector.sector),
            valid: startup.is_valid
        }
    }
}
exports.get_json_offer = (offer) => form_json(offer)