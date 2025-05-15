require('dotenv').config();
const express = require('express');
const app = express();
const StudentRoutes = require('./routes/StudentRoutes');
const { sequelize } = require('./models');

app.use(express.json());
app.use('/students', StudentRoutes);

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