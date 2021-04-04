const mongoose = require("mongoose");
require("dotenv").config({ path: '.env' });

mongoose
    .connect(
        "mongodb+srv://"+process.env.DB_USERNAME_PASS+"@bdprojet.tluvq.mongodb.net/test",

        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.log("Failed to connect MongoDB", err));