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
