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

  
