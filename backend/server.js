const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

app.use(cors());

const userRoute = require("./routes/userRoute");
app.use(express.json());    

mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected successfully");
        app.listen(process.env.PORT || 8000, (err) => {
            if (err) console.log(err);
            console.log("Running successfully at", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("Error", error);
    });

app.use(userRoute);