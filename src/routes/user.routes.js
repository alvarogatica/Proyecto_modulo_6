const express = require("express");
const auth = require("../middleware/authorization");
const {
  createUser,
  loginUser,
  verifyUser,
  logout,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/create", createUser); //Localhost:3000/api/users/create
userRouter.post("/login", loginUser); //Localhost:3000/api/users/login
userRouter.get("/verify-user", auth, verifyUser); //Localhost:3000/api/users/verify-user
userRouter.post("/logout", logout); //Localhost:3000/api/users/logout
userRouter.put("/:id", auth, updateUserById); //Localhost:3000/api/users/:id
userRouter.delete("/:id", auth, deleteUserById); //Localhost:3000/api/users/:id

module.exports = userRouter;
