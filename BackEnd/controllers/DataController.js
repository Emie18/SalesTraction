const { Model} = require('../models/Model.js');
const { Region, Language, WorkMode, School, OfferState, Sector, Commission } = Model

exports.region = async (req, res) => {
    try{
        const regions = await Region.findAll();

        const simpleRegionList = regions.map(region => region.region);
        res.status(200).json(simpleRegionList);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.lauguage = async (req, res) => {
    try{
        const languages = await Language.findAll();

        const simpleLanguageList = languages.map(language => language.lang);
        res.status(200).json(simpleLanguageList);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.work_mode = async (req, res) => {
    try{
        const modes = await WorkMode.findAll();

        const simpleModeList = modes.map(mode => mode.mode);
        res.status(200).json(simpleModeList);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.school = async (req, res) => {
    try{
        const schools = await School.findAll();

        const simpleSchoolList = schools.map(school => school.school);
        res.status(200).json(simpleSchoolList);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.offer_state = async (req, res) => {
    try{
        const states = await OfferState.findAll();

        const simpleStatesList = states.map(state => state.state);
        res.status(200).json(simpleStatesList);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.sector = async (req, res) => {
    try{
        const sector = await Sector.findAll();

        const simpleSectorList = sector.map(sector => sector.sector);
        res.status(200).json(simpleSectorList);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.commission = async (req, res) => {
    try{
        const commissions = await Commission.findAll();

        const simpleCommissionList = commissions.map(commission => commission.commission);
        res.status(200).json(simpleCommissionList);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};