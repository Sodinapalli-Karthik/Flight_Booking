import mongoose from "mongoose";
const Userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});   // this can be used to created at and updated at time

export default mongoose.model("User",Userschema )