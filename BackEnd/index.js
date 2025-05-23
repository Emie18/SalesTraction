require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const { Sequelize } = require('./models/Model');
const StudentRoutes = require('./routes/StudentRoutes');
const StartUpRoutes = require('./routes/StartUpRoutes');
const AccountRoutes = require('./routes/AccountRoutes');
const DataRoutes = require('./routes/DataRoutes');
const OfferRoutes = require('./routes/OfferRoutes');
const MatchRoutes = require('./routes/MatchRoutes');

app.use('/students', StudentRoutes);
app.use('/startup', StartUpRoutes);
app.use('/account', AccountRoutes);
app.use('/data', DataRoutes);
app.use('/offer', OfferRoutes);
app.use('/match', MatchRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('API is working 🚀');
});

// Connect DB and start server
const PORT = process.env.PORT || 3000;
Sequelize.authenticate().then(() => {
    console.log('DB connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});