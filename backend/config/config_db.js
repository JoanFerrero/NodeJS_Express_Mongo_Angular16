const mongoose = require('mongoose');

const connectDB = async (mongo_url = process.env.MONGO_URI) => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongo_url);
        console.log("DB connected")
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;