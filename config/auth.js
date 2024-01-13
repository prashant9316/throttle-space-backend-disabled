require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const SuperAdmin = require('../models/SuperAdmin')

const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      image: user.image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET_FOR_VERIFY,
    { expiresIn: "15m" }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log('authorization',authorization)
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const admin = await Admin.findOne({ role: "Admin", _id: req.user._id });
    if(admin){
      next()
    } else {
      res.status(401).send({
        message: "User is not Admin",
      });
    }
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

const isSuperAdmin = async(req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("decoded: ", decoded)
    const admin = await SuperAdmin.findOne({ role: "SuperAdmin", _id: req.user._id });
    if(admin){
      next()
    } else {
      res.status(401).send({
        message: "User is not Super Admin",
      });
    }
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
}

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
  isSuperAdmin
};
