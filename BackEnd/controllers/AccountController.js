const { Model} = require('../models/Model.js');
const { StartUp, Student, Account } = Model

exports.login = async (req, res) => {
    try {
        const { pass, email } = req.body;
        if(!pass || !email){
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const account = await Account.findOne({where: { email: email, password: pass }});
        if (!account) return res.status(401).json({ error: 'Invalid credentials' });

        if(account.startup){
            return res.status(201).json({ type : "startup", account : account, startup : account.startup });
        }

        if(account.student){
            return res.status(201).json({type : "student", account : account, startup : account.student});
        }

        res.status(401).json({ error: 'Invalid credentials' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
};

exports.delete = async (req, res) => {
    try{
        await Account.destroy({
            where: { id: req.query.id }
        });
        res.status(200).json({deleted : req.query.id});
    }catch(error){
        res.status(500).json({error : error.message});
    }
};