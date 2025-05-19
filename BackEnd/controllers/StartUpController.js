const { Model } = require('../models/Model.js');
const { Account, StartUp, AccountSector } = Model

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
        var startup_list = []
        const startups = await StartUp.findAll({
            include: [{
                as: "id_account_account",
                model: Account
            }]
        });

        for(const startup of startups){
            startup_list.push(await get_startup_json(startup))
        }
        res.status(200).json(startup_list);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.get = async (req, res) => {
    try{
        const startup = await StartUp.findOne({
            include: [{
                as: "id_account_account",
                model: Account
            }],
            where: { id_account: req.query.id }
        });

        if(!startup){
            res.status(500).json({error: "Account is not a startup"});
        }

        res.status(200).json(await get_startup_json(startup));
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

async function get_startup_json(startup) {
    if(!startup.id_account) return {}
    
    const account = startup.id_account_account
    const sector = await AccountSector.findAll({ where : { id : startup.id_account }})

    return {
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

exports.get_startup_data = async (id) => {
    const startup = await StartUp.findOne({
        include: [{
            as: "id_account_account",
            model: Account
        }],
        where: { id: id }
    });

    if(!startup) return null
    return get_startup_json(startup)
}