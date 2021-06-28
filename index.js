const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("db connected successfully "))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

//auth routes
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Hi bro!!!!!");
// });

app.use(
  session({
    secret: "kuch bhbi",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoutes);

app.listen(PORT, () => console.log(`PORT started at ${PORT}`));

app.get("/", (req, res) => {
  res.render("home");
});
