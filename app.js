const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDb = require("./db");
const ExpressError = require("./utils/ExpressError");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userModel");
const projectRoutes = require("./routes/projectRoute"); 
const userRoutes = require("./routes/userRoute"); 
require("dotenv").config();

let sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


connectDb()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((e) => console.log(e));

app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// ROUTES
app.get("/", (req, res) => {
  res.send("Root ");
});



app.use((req, res, next) => {
  // Make `req.user` available in all views
  res.locals.user = req.user || null;  // If there's no logged-in user, set it to null
  next();
});

// Project routes
app.use("/projects", projectRoutes);
//User routes 
app.use("/user", userRoutes);



        
app.use((err, req, res, next) => {
  let { status = 500, message = "SOME ERROR" } = err;
  console.log("-----X-----X-----");
  console.log(`Error : ${message}`);
  console.log("-----X-----X-----");
  return res.status(status).json({
    message,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});
