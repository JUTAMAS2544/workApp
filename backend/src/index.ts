import express, { Request, Response } from 'express';
import cors from 'cors';
import "reflect-metadata"
import { myDataSource } from "../app-data-source"

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

myDataSource
    .initialize()
    .then(() => {
        console.log("Connected to database")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

app.use('/api', require('./routes/userRoute').default);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});