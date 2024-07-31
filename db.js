const mongoose = require("mongoose");
const connectiondb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to database`.bgCyan.green);
    } catch (error) {
        console.log(`error connection to database`.bgCyan.red);
    }
}
module.exports = connectiondb;