const { Model} = require('../models/Model.js');
const { Offer, OfferDoc, OfferState } = Model

exports.update = async (req, res) => {
    try {
        const offer = await Offer.findOne({
            where : {id : req.body.id}
        });
        if(!offer) return res.status(500).json({ error: 'Failed to update the offer' });
        
        console.log(req.body.name)
        if (req.body.name) offer.nom = req.body.name
        if (req.body.product) offer.product = req.body.product
        if (req.body.pitch) offer.pitch = req.body.pitch
        if (req.body.commission) offer.commision = req.body.commission
        if (req.body.client) offer.client = req.body.client
        if (req.body.id_startup) offer.id_startup = req.body.id_startup
        if (req.body.nom_work_mode) offer.nom_work_mode = req.body.nom_work_mode
        await offer.save()
        console.log(offer.nom)

        res.status(201).json(offer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update the offer' });
    }
};

exports.create = async (req, res) => {
    try {
        const offer = await Offer.create({
            nom: req.body.name,
            produit: req.body.product,
            pitch: req.body.pitch,
            gamme: req.body.range,
            commision : req.body.commission,
            client : req.body.region,
            id_startup : req.body.startup,
            nom_work_mode : req.body.work_mode
        });
        res.status(201).json(offer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create the offer' });
    }
};

exports.delete = async (req, res) => {
    try {
        await Offer.destroy({ where : {id : req.query.id} });
        res.status(200).json({deleted : req.query.id});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete the offer' });
    }
};