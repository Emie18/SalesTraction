const { Model } = require('../models/Model.js');
const { Account, StartUp } = Model

exports.create = async (req, res) => {
    try {
        const account = await Account.create({
            type: "startup",
            name: req.body.name,
            email: req.body.email,
            password: req.body.pass,
            description : req.body.description ?? "",
            name_region : req.body.region,
            linkdin : req.body.linkdin
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
        const startup = await StartUp.findAll();
        res.status(200).json(startup);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};