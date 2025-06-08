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

## Implementacion de la solucion

Creamos los modelos que utilizaremos, User, Purse, Sunglass

* Modelo Usuario:
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
  
