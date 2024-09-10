const mongoose = require('mongoose');

const connectDB = async(uri)=>{
try {
  await mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, 
    });
    console.log("Mongoose connected");
} catch (error) {
    console.log(error);
}
}


module.exports = connectDB;