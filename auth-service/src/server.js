const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 3120;

app.use(cors({ origin : true }));

// Conectar a la base de datos
connectDB();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Protected route', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
