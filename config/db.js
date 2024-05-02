import mongoose from "mongoose";

export const connectWithDb = () => {
  mongoose
    .connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`Mongo Database connected successfully`))
    .catch((error) => {
      console.log(`Mongo Database connection failed`, error);
    });
};
