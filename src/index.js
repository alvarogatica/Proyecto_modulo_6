require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const purseRouter = require("./routes/purse.routes");
const sunglassRouter = require("./routes/sunglass.routes");
const cartRouter = require("./routes/cart.routes") // Importar las rutas de anteojos de sol

const PORT = process.env.PORT || 5000;
const app = express();
// Conectar a la base de datos
connectDB();

const isProd = process.env.NODE_ENV === "production";
const allowedOrigins = isProd
  ? process.env.FRONTEND_URL_PROD
  : process.env.FRONTEND_URL_DEV;
app.use(express.json());
app.use(
  cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(cookieParser());

app.use("/api/users", userRouter); // Rutas de usuarios
app.use("/api/purses", purseRouter); // Rutas de carteras
app.use("/api/sunglasses", sunglassRouter); // localhost:3000/api/sunglasses
app.use("/api/carts", cartRouter); // localhost:3000/api/carts

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
