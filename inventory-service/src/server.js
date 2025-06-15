const express = require('express');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./routes/inventoryRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 3120;

app.use(cors({ origin : true }));

// Conectar a la base de datos
connectDB();

app.use(bodyParser.json());
app.use('/api/productos', inventoryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
