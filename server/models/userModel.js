import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true },
    verifyOtp : {type : String , default : '' },
    verifyOtpExpireAt: {type : Number , default : 0 },
    isAccountVerified: {type : Boolean , default : false },
    resetOtp: {type : String , default : ''},
    resetOtpExpireAt : {type : Number, default : 0},
})

// creating new data model named as user
const userModel = mongoose.models.user || mongoose.model('user' , userSchema)

export default userModel;

// now we can use this user model in other files to store the user data in mongodb

// to create the new user we have to create a controller and using the controller function we will create the API endpoint 