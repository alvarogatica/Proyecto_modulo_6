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
