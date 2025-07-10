const Purse = require("../models/purse.model");
const stripe = require("stripe")(process.env.STRIPE_KEY);

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
  const { name, price, description, img, currency, slug } = req.body;
  try {
    const product = await stripe.products.create({
      name,
      description,
      images: [img],
      metadata: { productDescription: description, slug },
    });
    const stripePrice = await stripe.prices.create({
      unit_amount: price,
      currency,
      product: product.id,
    });
    const newPurse = await Purse.create({
      idProd: product.id,
      priceID: stripePrice.id,
      name,
      price,
      description,
      img,
      slug,
      currency,
    });
    return res.status(200).json({ newPurse });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al crear la Cartera",
      error: error.message,
    });
  }
};

exports.updatePurseById = async (req, res) => {
  const { name, price, description, img } = req.body;
  try {
    const updatedPurse = await Purse.findByIdAndUpdate(
      req.params.id,
      { name, price, description, img },
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
