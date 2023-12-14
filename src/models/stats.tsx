import mongoose, { model } from "mongoose";

const statsModel = new mongoose.Schema({
  user: {
    type: Number,
    default: 0,
  },
  subscription: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const stats = (module.exports =
  mongoose.models.course || mongoose.model("stat", statsModel));

export default stats;
