# Proyecto_modulo_6

RAILWAY LINK: https://proyectomodulo6-production.up.railway.app/

## Planteamiento
Este proyecto consiste en una app backend de un comercio electronico de productos de moda, usando Node.js y Express.
Aparte la plataforma permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar), como para los usuarios como para los productos.

## Tecnologias utilizadas
* Node.js
* Express
* Railway
* MongoDB Atlas(Cloud)
* jsonwebtoken
* bcryptjs
* cors
* dotenv
* mongoose

## Requerimientos
* Organizacion precisa y clara de archivos y carpetas
* Crear minimo dos Modelos (Usuario, Producto)
* Implementacion de metodos CRUD
* Modelado de producto
* Uso adecuado de Github

## Estructura de archivos y carpetas

![image](https://github.com/user-attachments/assets/e86f8607-ce4b-40e6-bb70-9ae1b45f5c68)

## Instalacion

* Abre una terminal en windows y sigue los pasos.
* Clona este repositorio: ``git clone https://github.com/alvarogatica/Proyecto_modulo_6.git``
* Situate en la carpeta principal: ``cd Proyecto_modulo_6``
* Instala las dependencias: ``npm install``
* Asegurate de crear un archivo ``.env`` en la carpeta principal que contenga las siguientes variables de entorno:

````
* MONGODB_URI=mongodb+srv://admin:admin@proyecto6.vdjfgil.mongodb.net/?retryWrites=true&w=majority&appName=proyecto6
* PORT=3000
* SECRET=UCAMP
````
* Corre el proyecto: ``npm run dev``

## ENDPOINTS
### Usuario
(Para los Endpoint usuario que tiene que verificar el ID, es necesario revisar el token bearer que nos entrega la hashed password, para que de esta forma reconozca el token que se le pasa para verificar que el usuario es correcto)

| Descripcion   | Metodo | Endpoint |
| ------------- | ------------- | ----------- |
| Crear Usuario  | POST  | /api/users/create |
| Login  | POST  | /api/users/login |
| Verificar Usuario | GET | /api/users/verify-user |
| Actualizar Usuario | PUT | /api/users/:id |
| Eliminar Usuario | DELETE | /api/users/:id |

### Purse

| Descripcion   | Metodo | Endpoint |
| ------------- | ------------- | ----------- |
| Crear Cartera  | POST  | /api/purses/create |
| Obtener listado de carteras  | GET  | /api/purses/ |
| Actualizar Cartera | PUT | /api/purses/:id |
| Eliminar cartera | DELETE | /api/purses/:id |

### Sunglass

| Descripcion   | Metodo | Endpoint |
| ------------- | ------------- | ----------- |
| Crear Anteojos  | POST  | /api/sunglasses/create |
| Obtener listado de anteojos | GET | /api/sunglasses/ |
| Actualizar anteojos | PUT | /api/sunglasses/:id |
| Eliminar anteojos | DELETE | /api/sunglasses/:id |

## Implementacion de la solucion

Creamos los modelos que utilizaremos, User, Purse, Sunglass

## 1. Modelo Usuario:
````js
const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
````
* Controlador de Usuario (CRUD):
````js
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({ newUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al crear el usuario",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ msg: "Usuario no existe" });
    }
    const isValidPasssword = await bcryptjs.compare(
      password,
      foundUser.password
    );
    if (!isValidPasssword) {
      return res
        .status(400)
        .json({ msg: "usuario o contraseña no corresponden" });
    }
    const payload = { user: { id: foundUser.id } };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) throw error;
        res.json(token);
      }
    );
  } catch (error) {
    res.json({
      msg: "error al iniciar sesion",
      error,
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al verificar el usuario",
      error: error.message,
    });
  }
};

exports.updateUserById = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password: hashedPassword },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ updatedUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error actualizando el usuario",
      error: error.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ deletedUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error borrando el usuario",
      error: error.message,
    });
  }
};
````
* Rutas de Usuario:
````js
const express = require("express");
const auth = require("../middleware/authorization");
const {
  createUser,
  loginUser,
  verifyUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/create", createUser); //Localhost:3000/api/users/create
userRouter.post("/login", loginUser); //Localhost:3000/api/users/login
userRouter.get("/verify-user", auth, verifyUser); //Localhost:3000/api/users/verify-user
userRouter.put("/:id", auth, updateUserById); //Localhost:3000/api/users/:id
userRouter.delete("/:id", auth, deleteUserById); //Localhost:3000/api/users/:id

module.exports = userRouter;
````
## 2. Modelo Purse
````js
const mongoose = require("mongoose");
const purseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Purse = mongoose.model("Purse", purseSchema);

module.exports = Purse;
````
* Controlador de Purse
````js
const Purse = require("../models/purse.model");

exports.getAllPurses = async (req, res) => {
  try {
    const purses = await Purse.find({});
    res.json({
      purses,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al recuperar los datos de las carteras",
      error: error.message,
    });
  }
};

exports.createPurse = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newPurse = await Purse.create({ name, price });
    return res.status(200).json({ newPurse });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al crear la Cartera",
      error: error.message,
    });
  }
};

exports.updatePurseById = async (req, res) => {
  const { name, price } = req.body;
  try {
    const updatedPurse = await Purse.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true, runValidators: true }
    );
    if (!updatedPurse) {
      return res.status(404).json({ message: "cartera no encontrada" });
    }
    return res.status(200).json({ updatedPurse });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error actualizando la cartera",
      error: error.message,
    });
  }
};

exports.deletePurseById = async (req, res) => {
  try {
    const deletedPurse = await Purse.findByIdAndDelete(req.params.id);
    if (!deletedPurse) {
      return res.status(404).json({ message: "Cartera no encontrada" });
    }
    return res.status(200).json({ deletedPurse });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error borrando la cartera",
      error: error.message,
    });
  }
};
````
* Rutas de Purse
````js
const express = require("express");
const {
  getAllPurses,
  createPurse,
  updatePurseById,
  deletePurseById,
} = require("../controllers/purse.controller");
const guitarRouter = express.Router();

guitarRouter.get("/", getAllPurses); // Localhost:3000/api/purses/
guitarRouter.post("/create", createPurse); // Localhost:3000/api/purses/create
guitarRouter.put("/:id", updatePurseById); // Localhost:3000/api/purses/:id
guitarRouter.delete("/:id", deletePurseById); // Localhost:3000/api/purses/:id

module.exports = guitarRouter;
````
## 3. Modelo de Sunglass:
````js
const mongoose = require("mongoose");
const sunglassSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Sunglass = mongoose.model("Sunglass", sunglassSchema);

module.exports = Sunglass;
````
* Controlador de Sunglass
````js
const Sunglass = require("../models/sunglass.model");

exports.getAllSunglasses = async (req, res) => {
  try {
    const sunglasses = await Sunglass.find({});
    res.json({
      sunglasses,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error al recuperar los datos de los anteojos de sol",
      error: error.message,
    });
  }
};

exports.createSunglass = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newSunglass = await Sunglass.create({ name, price });
    return res.status(200).json({ newSunglass });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al crear los anteojos de sol",
      error: error.message,
    });
  }
};

exports.updateSunglassById = async (req, res) => {
  const { name, price } = req.body;
  try {
    const updatedSunglass = await Sunglass.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true, runValidators: true }
    );
    if (!updatedSunglass) {
      return res
        .status(404)
        .json({ message: "anteojos de sol no encontrados" });
    }
    return res.status(200).json({ updatedSunglass });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error actualizando los anteojos de sol",
      error: error.message,
    });
  }
};

exports.deleteSunglassById = async (req, res) => {
  try {
    const deletedSunglass = await Sunglass.findByIdAndDelete(req.params.id);
    if (!deletedSunglass) {
      return res
        .status(404)
        .json({ message: "Anteojos de sol no encontrados" });
    }
    return res.status(200).json({ deletedSunglass });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error borrando los anteojos de sol",
      error: error.message,
    });
  }
};
````
* Rutas de Sunglass
````js
const express = require("express");
const {
  getAllSunglasses,
  createSunglass,
  updateSunglassById,
  deleteSunglassById,
} = require("../controllers/sunglass.controller");

const sunglassRouter = express.Router();

sunglassRouter.get("/", getAllSunglasses); // Localhost:3000/api/sunglasses/
sunglassRouter.post("/create", createSunglass); // Localhost:3000/api/sunglasses/create
sunglassRouter.put("/:id", updateSunglassById); // Localhost:3000/api/sunglasses/:id
sunglassRouter.delete("/:id", deleteSunglassById); // Localhost:3000/api/sunglasses/:id

module.exports = sunglassRouter;
````

## CONEXION A BD: 
````js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("conectado a la base de datos");
  } catch (error) {
    console.error("error al conectar con MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
````
## Uso de middleware de authorization:
````js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ msg: "No autorizado" });
  }
  try {
    let [type, token] = authorization.split(" ");
    if (type === "Token" || type === "Bearer") {
      const openToken = jwt.verify(token, process.env.SECRET);
      req.user = openToken.user;
      next();
    } else {
      return res.status(401).json({ msg: "No autorizado" });
    }
  } catch (error) {
    res.json({
      msg: "Token no valido",
      error: error.message,
    });
  }
};
````
## Archivo principal de la app:
````js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const purseRouter = require("./routes/purse.routes");
const sunglassRouter = require("./routes/sunglass.routes"); // Importar las rutas de anteojos de sol

const PORT = process.env.PORT || 5000;
const app = express();
// Conectar a la base de datos
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter); // Rutas de usuarios
app.use("/api/purses", purseRouter); // Rutas de carteras
app.use("/api/sunglasses", sunglassRouter); // Rutas de anteojos de sol

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
````
