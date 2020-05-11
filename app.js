//create Express server
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

//connect mongoDB
mongoose
.connect(db, { useNewUrlParser: true })
.then( () => console.log("Connected to MongoDB successfully"))
.catch( err => console.log(err));

//respond to json req and other software
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

//routes
app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.get("/", (req, res) => res.send("Hello world"));

//port
const port = process.env.PORT || 5000;

//socket, listen for connections on path
app.listen(port, () => console.log(`Listening on port ${port}`));

