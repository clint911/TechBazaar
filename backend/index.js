
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json()); // Specifying we will be receiving the data in json format

app.use('api/')