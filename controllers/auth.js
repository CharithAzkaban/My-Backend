const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { encryptUserPassword, isPasswordOK } = require("../utils/encryptions");
const { createError } = require("../utils/error");

exports.loginUser = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.findOne({ username: body.username });

    if (!user)
      return next(createError({ status: 404, message: "User not found!" }));

    const isPasswordCorrect = await isPasswordOK({
      password: body.password,
      hashedPassword: user.password,
    });

    if (!isPasswordCorrect)
      return next(createError({ status: 400, message: "Wrong password!" }));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = new User({
      username: body.username,
      email: body.email,
      password: encryptUserPassword(body.password),
    });

    newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
};
