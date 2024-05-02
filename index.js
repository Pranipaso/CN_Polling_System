import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import router from "./routes/index.js";
import { connectWithDb } from "./config/db.js";
import cors from "cors";
dotenv.config();
const { PORT } = process.env;
const app = express();
app.use(cors);

// for swagger documentation
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use express router
app.use("/", router);

app.listen(PORT || 3000, (err) => {
  if (err) {
    console.log(`Error running the server : ${err}`);
  }
  connectWithDb();
  console.log(`Server is up and running at ${PORT}`);
});
