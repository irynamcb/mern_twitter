const express = require('express');
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require('./models/User');
const bodyParser = require('body-parser');
const passport = require("passport");
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch(err => console.log(err));
// Setup the path
app.get("/", (req, res) => {
    const user = new User({
        handle: "jim",
        email: "jim@aa.io",
        password: "jimisgreat123"
    });
    // user.save();
    console.log(res)
    res.send("Hello, Iryna!")
});
app.use("/api/users", users);
app.use("/api/tweets", tweets);
// Check the environmental variable port, if it exist, use it. Otherwise, use 5000 
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})