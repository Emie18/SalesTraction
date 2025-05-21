const { Model } = require('../models/Model.js');
const { Account, StartUp, AccountSector, Offer } = Model
const JsonHelper = require("./JsonHelper.js");

exports.create = async (req, res) => {
    try {
        const account = await Account.create({
            type: "startup",
            name: req.body.name,
            email: req.body.email,
            password: req.body.pass,
            description : req.body.description ?? "",
            region : req.body.region ?? "Bretagne",
            linkedin : req.body.linkedin
        });
        const startup = await StartUp.create({
            is_valid: false,
            id_account: account.id,
            siret: req.body.siret
        })
        res.status(201).json(startup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create startup' });
    }
};

exports.getAll = async (req, res) => {
    try{
        const startups = await StartUp.findAll({
            include: [{
                as: "id_account_account",
                model: Account,
                include: [{ as: "account_sectors", model: AccountSector }]
            }]
        });


        res.status(200).json(JsonHelper.startups(startups));
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.getOffers = async (req, res) => {
    try{
        const user_id = parseInt(req.params.id);

        const offers = await Offer.findAll({ 
            include: [{
                as: "id_startup_startup",
                model: StartUp,
                required: true,
                include: [{
                    where: {id: user_id}, 
                    as: "id_account_account",
                    model: Account,
                    required: true,
                    include: [{ as: "account_sectors", model: AccountSector }]
                }]
            }]
        })

        res.status(200).json(JsonHelper.offers(offers));

    }catch(error){
        res.status(500).json({error : error.message});
    }
}


exports.get = async (req, res) => {
    try{
        const startup = await StartUp.findOne({
            include: [{
                as: "id_account_account",
                model: Account,
                include: [{ as: "account_sectors", model: AccountSector }]
            }],
            where: { id_account: req.query.id }
        });

        if(!startup){
            res.status(500).json({error: "Account is not a startup"});
        }

        res.status(200).json(JsonHelper.startup(startup));
    }catch(error){
        res.status(500).json({error : error.message});
    }
}


