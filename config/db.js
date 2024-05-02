import mongoose from "mongoose";

export const connectWithDb = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(console.log(`Mongo Database connected successfully`))
    .catch((error) => {
      console.log(`Mongo Database connection failed`, error);
    });
};
