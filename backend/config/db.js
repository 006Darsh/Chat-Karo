const mongoose = require("mongoose");
require("dotenv").config();
const DBURL = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(DBURL, {
      // useNewPasrser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    });
    console.log(`Database is connected to: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};


module.exports = connectDB;