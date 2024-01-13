require("dotenv").config();
const mongoose = require("mongoose");
const { setData, getData } = require("../webconfigService/webconfig");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("mongodb connection success!");
    const data = await setData();
    console.log("Successfully fetched website config");
    console.log(getData())
  } catch (err) {
    console.log("mongodb connection failed!", err.message);
  }
};

module.exports = {
  connectDB,
};
