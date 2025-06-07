require ('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const app = express();
// Conectar a la base de datos
connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});