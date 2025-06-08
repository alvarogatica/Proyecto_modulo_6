const express = require('express');
const {
  getAllSunglasses,
  createSunglass,
  updateSunglassById,
  deleteSunglassById,
} = require('../controllers/sunglass.controller');

const sunglassRouter = express.Router();

sunglassRouter.get('/', getAllSunglasses); // Localhost:3000/api/sunglasses/
sunglassRouter.post('/create', createSunglass); // Localhost:3000/api/sunglasses/create
sunglassRouter.put('/:id', updateSunglassById); // Localhost:3000/api/sunglasses/:id
sunglassRouter.delete('/:id', deleteSunglassById); // Localhost:3000/api/sunglasses/:id

module.exports = sunglassRouter;
