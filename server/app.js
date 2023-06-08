const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require('./routes/profile')
const eventRoutes = require('./routes/events')
require('dotenv').config({ path: "./config/config.env" })

const admin = require("./config/admin");
const db = admin.firestore();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use('/profile',userRoutes)
app.use('/events',eventRoutes)

app.use("/api", require("./routes/paymentRoutes"));


app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);


app.listen(process.env.PORT, function () {
  console.log(`Server started at `+ process.env.PORT);
});
