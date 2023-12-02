const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_HOST, {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB Connected", conn.connection.host);
  } catch (error) {
    console.log("Error Connection to MongoDB. ERROR: ", error.message);
    process.exit();
  }
};

module.exports = connect_db;
