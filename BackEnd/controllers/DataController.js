const { Model} = require('../models/Model.js');
const { Region } = Model

exports.region = async (req, res) => {
    try{
        const regions = await Region.findAll();

        const simpleRegionList = regions.map(region => region.name);
        res.status(200).json(simpleRegionList);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};