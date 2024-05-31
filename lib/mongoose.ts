import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);

const db = mongoose.connection;

db.once("open", (err) => {
    err
      ? console.log("Mongodb not connected")
      : console.log("Mongodb connected....");
  });

export default db;