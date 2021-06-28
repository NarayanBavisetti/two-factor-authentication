// const express = require("express");
// const dotenv = require("dotenv");

// const PORT = process.env.PORT || 5000;

// const app = express();

// dotenv.config({ path: "./.env" });

// const serviceId = process.env.SERVICE_ID;
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;

// const client = require("twilio")(accountSid, authToken);

// app.get("/login", (req, res) => {
//   client.verify
//     .services(serviceId)
//     .verifications.create({
//       to: `+${req.query.phonenumber}`,
//       channel: req.query.channel,
//     })
//     .then((data) => {
//       res.status(200).send(data);
//     });
// });

// app.listen(PORT, () => console.log(`PORT is running at ${PORT}`));


// app.get("/verify" ,(req,res) => {
//   client.verify.services(serviceId).verificationChecks.create({
//     to: `+${req.query.phonenumber}`,
//     code: req.query.code,
//   })
//   .then((data) => {
//     res.status(200).send(data);
//     res.status(200).json({msg: "success"});
//   });
// })