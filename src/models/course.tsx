import mongoose, { model } from "mongoose";

const coursesModel = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    minLength: [4, "title must be atleast 4 charecter long"],
    maxLength: [80, "title can't be exceed 80 charecter long"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    minLength: [20, "title must be atleast 4 charecter long"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        Public_id: {
          type: String,
          required: true,
        },
        Url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  numOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: [true, "Enter Course Creator Name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const course = (module.exports =
  mongoose.models.course || mongoose.model("course", coursesModel));

export default course;
