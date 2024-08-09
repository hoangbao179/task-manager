import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import routes from "./routes/index.router";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'https://lenlichhtrinh.info', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));


AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.use('/api', routes);  

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export default app;
