const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouts = require('./routes/userRoutes')
const PORT = 5001;

const app = express();

app.use(express.json());

app.use(cors());

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo DB Connected Successfully'))
    .catch(error => console.log(error));

app.use('/', userRouts);

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`)
});

