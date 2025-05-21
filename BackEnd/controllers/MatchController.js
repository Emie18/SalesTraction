const { Model} = require('../models/Model.js');
const { StartUp, Student, Account, AccountMatch, LanguageStudent, AccountSector, Offer } = Model
const { Op } = require('sequelize');
const JsonHelper = require("./JsonHelper.js");

exports.like = async (req, res) => {
    try{
        const { from, to } = req.body;
        if (from === to) return res.status(400).send("Can't like yourself");
        
        // Found who is a student
        const students = await Student.findAll({
            attributes: ['id_account'],
            where: { id_account: { [Op.in]: [from, to] } }
        });
      
        const from_is_student = students.some(s => s.id_account === from);
        const to_is_student   = students.some(s => s.id_account === to);

        // Found illegal combinations
        if(from_is_student === to_is_student){
            return res.status(400).send(`Can't like another ${from_is_student ? 'student' : 'startup'}`);
        }

        //Normalise data for AccountMatch
        const id_student        = from_is_student ? from : to;
        const id_startup        = from_is_student ? to : from;
        const liked_by_startup  = !from_is_student; // true if startup is the liker

        //get true ids
        const startup = await StartUp.findOne({ where : { id_account : id_startup }});
        const student = await Student.findOne({ where : { id_account : id_student }});

        if(!startup) return res.status(500).json({error: "could not fetch startup"});
        if(!student) return res.status(500).json({error: "could not fetch student"});

        // Insert (or get) the like + test for match
        const [account_match, created] = await AccountMatch.findOrCreate({
            where: { id_student: student.id, id_startup: startup.id, liked_by_startup: liked_by_startup }
        });
    
        const match = await AccountMatch.findOne({
            where: { id_student: student.id, id_startup: startup.id, liked_by_startup: !liked_by_startup }
        });

        return res.status(200).json({ liked: created, is_match: !!match });

    }catch(error){
        res.status(500).json({error : error.message});
    }
};


// TODO: lazyloading
exports.suggestion = async (req, res) => {
    try{
        const user_id = parseInt(req.params.id);
        
        const user_startup = await StartUp.findOne({ where : { id_account : user_id }});
        const user_student = await Student.findOne({ where : { id_account : user_id }});

        if(!user_student && !user_startup) return res.status(500).json({error : "The user is not a startup nor a student"});
        if(user_student && user_startup) return res.status(500).json({error : "The user is a startup and a student"});

        const likes = await AccountMatch.findAll({
            where: { 
                ...(user_student && {id_student: user_student?.id}),
                ...(user_startup && {id_startup: user_startup?.id})
            }
        });
        
        const liked_ids = likes.map(like => (
            like.id_student === user_student?.id ? like.id_startup : like.id_student
        ));

        if(user_student){
            const suggestions = await Offer.findAll({
                include: [{
                    as: "id_startup_startup", model: StartUp,
                    include: [{
                        as: "id_account_account", model: Account,
                        include: [{
                            as: "account_sectors", model: AccountSector
                        }]
                    }],
                    where: { 
                        id: { [Op.notIn]: [...liked_ids, user_id] },
                        is_valid: true
                    }
                }]
            });

            return res.status(200).json(JsonHelper.offers(suggestions));
        }

        if(user_startup){
            console.log("liked:" + liked_ids)
            const suggestions = await Student.findAll({
                include: [{
                    as: "id_account_account", model: Account,
                    include: [{ 
                        as: "account_sectors", model: AccountSector 
                    }],
                },{ as: "language_students", model: LanguageStudent }],
                where: { id: { [Op.notIn]: [...liked_ids, user_id] } }
            });

            return res.status(200).json(JsonHelper.students(suggestions));
        }


        res.status(500).json({error : "user is not a student nor a startup"});
        
    }catch(error){
        res.status(500).json({error : error.message});
    }
}

