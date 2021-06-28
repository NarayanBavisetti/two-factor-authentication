const express = require("express");
const User = require("../models/user");
const router = express.Router();
const passport = require("passport");
const dotenv = require("dotenv")

//to get the signup form
router.get("/register", (req, res) => {
  res.render("auth/signup");
});

//to register the user
router.post("/register", async (req, res) => {
  const user = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    phonenumber: req.body.phonenumber,
    channel:req.body.channel
  };
  const newUser = await User.register(user, req.body.password);
  res.status(200).send(newUser);

  // console.log(req.body)
  // res.send("Success");
});

//login
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),(req, res) => {
    res.render("auth/verify");
  }
  
);

router.get("/logout",((req,res) => {
    req.logout();
    res.render("auth/login")
}))

dotenv.config({ path: "../.env" });

const serviceId = process.env.SERVICE_ID;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

router.get("/verify", (req, res) => {

  const {phonenumber,channel} = req.body;
  client.verify
    .services(serviceId)
    .verifications.create({
      to: `+91${phonenumber}`,
      channel: channel,
    })
    .then((data) => {
      res.status(200).send(data);
    });
});




router.post("/verify" ,(req,res) => {
  client.verify.services(serviceId).verificationChecks.create({
    to: `+${req.body.phonenumber}`,
    code: req.body.code,
  })
  .then((data) => {
    res.status(200).send(data);
    res.status(200).json({msg: "success"});
  });
})

module.exports = router;
