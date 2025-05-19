const { Model } = require('../models/Model.js');
const { Student, Account, LanguageStudent, AccountSector } = Model

exports.create = async (req, res) => {
    try {
        const account = await Account.create({
            type: "student",
            name: req.body.name,
            email: req.body.email,
            password: req.body.pass,
            description : "",
            linkdin: "linkedin",
            name_region : req.body.region ?? "Bretagne"
        });
        const student = await Student.create({
            id_account: account.id,
            surname: req.body.surname,
            name: req.body.school ?? null,
            disponibility: req.body.disponibility
        })
        
        for(const lang of req.body.languages){
            await LanguageStudent.create({
                id: student.id,
                name: lang,
                natif: false,
            })
        }
        for(const sector of req.body.sector){
            await AccountSector.create({
                id: account.id,
                name: sector,
            })
        }

        res.status(201).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create student' });
    }
};

exports.getAll = async (req, res) => {
    try{
        var student_list = [] 
        const students = await Student.findAll({
            include: [{
                as: "id_account_account",
                model: Account
            }]
        });

        for(const student of students){
            const account = student.id_account_account
            const languages = await LanguageStudent.findAll({ where : { id : student.id }})
            const sector = await AccountSector.findAll({ where : { id : account.id }})

            student_list.push({
                student_id: student.id,
                account_id: student.id_account,
                name: account.name,
                surname: student.surname,
                email: account.email,
                disponibility: student.disponibility,
                description: account.description,
                linkedin: account.linkdin,
                school: student.name,
                region: account.name_region,
                languages: languages.map(language => language.name),
                sector: sector.map(sector => sector.name)
            })
        }

        res.status(200).json(student_list);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};