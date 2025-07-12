const Sunglass = require("../models/sunglass.model");
const stripe = require("stripe")(process.env.STRIPE_KEY);

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
    const newSunglass = await Sunglass.create({
      idProd: product.id,
      priceID: stripePrice.id,
      name,
      price,
      description,
      img,
      slug,
      currency,
    });
    return res.status(200).json({ newSunglass });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al crear los anteojos de sol",
      error: error.message,
    });
  }
};

exports.updateSunglassById = async (req, res) => {
  const { name, price, description, img } = req.body;
  try {
    const updatedSunglass = await Sunglass.findByIdAndUpdate(
      req.params.id,
      { name, price, description, img },
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
