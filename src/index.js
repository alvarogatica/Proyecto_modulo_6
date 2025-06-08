require ('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const purseRouter = require('./routes/purse.routes');
const sunglassRouter = require('./routes/sunglass.routes'); // Importar las rutas de anteojos de sol

const PORT = process.env.PORT || 5000;
const app = express();
// Conectar a la base de datos
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter); // Rutas de usuarios
app.use('/api/purses', purseRouter); // Rutas de carteras
app.use('/api/sunglasses', sunglassRouter); // Rutas de anteojos de sol

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});