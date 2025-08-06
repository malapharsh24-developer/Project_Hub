const mongoose = require("mongoose");

module.exports = connectDb = async()=>{
    await mongoose.connect(process.env.MONGO_URI);
}