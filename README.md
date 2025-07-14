# **urdupes.cl**

LINK PROD: https://urdupescl.onrender.com/

Este es el **backend** de urdupes.cl, una tienda online de accesorios femeninos minimalistas. Desarrollado con **Node.js**, **Express**, **MongoDB** y **Stripe** para pagos.

## Tecnologías

- **Node.js + Express**: servidor web y API REST.
- **MongoDB + Mongoose**: base de datos NoSQL para usuarios, productos y carrito.
- **JWT**: autenticación de usuarios.
- **Cookie-Parser** y **CORS**: manejo de cookies y políticas de acceso.
- **Stripe**: integración para pagos seguros.
- **Dotenv**: configuración de variables de entorno.

## Funcionalidades

- CRUD de usuarios (registro, login, verificación).
- Endpoints para carteras y anteojos de sol.
- Operaciones de carrito de compras.
- Creación de sesión de pago con Stripe.
- Páginas de éxito y cancelación de pago.
- Configuración CORS para frontend desplegado.

## Estructura de carpetas: 

<img width="252" height="620" alt="image" src="https://github.com/user-attachments/assets/69b72c14-3c41-45eb-ba2d-e4cc7112f5ee" />


## Uso local

Clona el repositorio, instala dependencias y configura tu archivo `.env`.

```bash
git clone https://github.com/alvarogatica/Proyecto_modulo_6.git
```
Dirigete a la carpeta raiz del proyecto:

```bash
cd Proyecto_modulo_6
```

Instala las dependencias:

```bash
npm install
```

Crea un archivo ``.env`` con las siguientes variables:

```bash
MONGODB_URI=tu_uri_mongodb
PORT=3000
SECRET=tu_secreto_jwt
NODE_ENV=development
FRONTEND_URL_PROD=https://tu-frontend-en-vercel.vercel.app
FRONTEND_URL_DEV=http://localhost:5173
STRIPE_KEY=tu_clave_secreta_stripe
STRIPE_SUCCESS_URL=https://tu-frontend-en-vercel.vercel.app/success
STRIPE_CANCEL_URL=https://tu-frontend-en-vercel.vercel.app/cancel
```

Inicia el servidor: 

```bash
npm run dev
```

La API estara disponible en tu puerto local.

## Notas

- Configura bien ``CORS`` para permitir el dominio de tu frontend.
- Para produccion, cambia ``NODE_ENV`` a ``"production"`` y revisa las URLs.
- Desarrollado por Álvaro Gatica.




