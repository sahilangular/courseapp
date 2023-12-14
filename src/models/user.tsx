import mongoose, { Schema, models } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validator: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be atleast 6 charecter"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  subscription: {
    id: String,
    status: String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  Playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
      poster: String,
    },
  ],
  token:{
    type:String,
    default:crypto.randomBytes(20).toString('hex'),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// userModel.pre("save", async function () {
//   if(!this.isModified('password')) {
//     console.log('password same')
//   }
//   this.password = await bcrupt.hash(this.password, 10);
// });

userModel.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, "adcnijbdcibwibdcbsldkcnon", {
    expiresIn: "15d",
  });
};

userModel.methods.hashPassword= async function(password: string | Buffer){
  return await bcrypt.hash(password, 10)
}

userModel.methods.comparePassword =  async function (password: string | Buffer) {
  return await bcrypt.compare(password,this.password)
};

const user = (module.exports =
  models.user || mongoose.model("user", userModel));

export default user;
