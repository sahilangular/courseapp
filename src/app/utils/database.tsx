import mongoose from "mongoose";

const connectDb = async () => {
  const { connection } = await mongoose.connect(
    "mongodb+srv://dalvisahil86:4KrFQzMr23evlSyA@cluster0.fwk73lr.mongodb.net/coursebundler"
  );
  console.log(`database connected with ${connection.host}`);
};

export default connectDb;
