const { StartUp, Student } = require('../models');

exports.login = async (req, res) => {
    try {
        const { pass, email } = req.body;
        if(!pass || !email){
            res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Login with startup
        const startup = await StartUp.findOne({where: { email: email }});
        if(startup){
            if(startup.pass === pass){
                res.status(201).json({
                    type : "startup",
                    data : startup
                });
                return
            }
            //res.status(401).json({ error: 'Invalid credentials' });
            //return
        }
        
        // Login with student
        const student = await Student.findOne({where: { email: email }});
        console.log(student)
        if(student && student.dataValues.pass === pass){
            res.status(201).json({
                type : "student",
                data : student
            });
            return
        }

        res.status(401).json({ error: 'Invalid credentials' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
};
