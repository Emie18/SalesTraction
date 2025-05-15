require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const { sequelize } = require('./models');
const StudentRoutes = require('./routes/StudentRoutes');
const StartUpRoutes = require('./routes/StartUpRoutes');

app.use('/students', StudentRoutes);
app.use('/startup', StartUpRoutes);


app.get('/', (req, res) => {
    res.send('API is working 🚀');
});

// Connect DB and start server
const PORT = process.env.PORT || 3000;
sequelize.authenticate().then(() => {
    console.log('DB connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});