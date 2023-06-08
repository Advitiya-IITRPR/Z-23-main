const crypto = require("crypto");

const Razorpay = require("razorpay");
const admin = require("../config/admin");
const db = admin.firestore();
const FieldValue = require("firebase-admin").firestore.FieldValue;


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

checkout = async (req, res) => {
  try {
    let amount=0;
    const eventId = req.body.event;
    const email = req.user.email;

    var user
    const users = await db.collection("Users").get()
    const list = users.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    list.forEach(element => {
      if (element.email === req.body.email) {
        user = element
      }
    })
    if (user === undefined || user === null) {
      res.status(400).json("User Not Found")
    }
    else {
      if (!req.user.email_verified) {
        res.status(200).send({ 'message': "First verify your email id" });
      }
      else {
        if (user.events.includes(eventId)) {
          res.status(200).send({ 'message': "You have already registered for the following events" });
        }
        else {
          zcoin = user.Zcoin;
          const snapShot = await db.collection('events').doc(eventId).get();
          if (snapShot.empty) {
            res.status(404).send({ 'message': 'No events found' });
          } else {
            if (zcoin <= snapShot.data().entryFee) {
              amount = snapShot.data().entryFee - zcoin;
              // db.collection("Users").doc(email).update({ 'Zcoin': 0 });
            }
            else {
              return res.status(200).json({
                success: true,
                order: {
                  amount: 0
                }
              })
              // db.collection("Users").doc(email).update({ 'Zcoin': zcoin - (snapShot.data().entryFee)/2 });
            }
          }
          const options = {
            amount: Number(amount * 100),
            currency: "INR",
          };
          const order = await instance.orders.create(options);
          res.status(200).json({
            success: true,
            order,
          });
        }
      }

    }


  } catch (error) {
    res.status(500).send(error.message);
  }
};

paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
    // console.log(expectedSignature);
    // console.log(razorpay_signature);

    const isAuthentic = (expectedSignature === razorpay_signature);

    if (isAuthentic) {
      // Database comes here

      const paymentJson = {
        orderId: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        signature: razorpay_signature
      };
      const response = db.collection("payments").doc(razorpay_order_id).set(paymentJson);

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

passCheckout = async (req, res) => {
  try {
    let amount;
    const pass = req.body.pass;
    const email = req.user.email;

    var user
    const users = await db.collection("Users").get()
    const list = users.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    list.forEach(element => {
      if (element.email === req.body.email) {
        user = element
      }
    })
    if (user === undefined || user === null) {
      res.status(400).json("not found")
    }
    else {
      if (req.user.email_verified) {
        res.status(450).send({ 'message': "First verify your email id" });
      }
    }
    if (pass === "platinum") {
      amount = 2000;
    }
    else if (pass === "gold") {
      amount = 1500;
    }
    else if (pass === "silver") {
      amount = 1000;
    }
    else if (pass === "bronze") {
      amount = 800;
    }
    else {
      res.status(500).send({ "message": "Something went wrong" });
    }
    // const snapShot = await db.collection('events').doc(req.body.event).get();
    // if (snapShot.empty) {
    //   res.status(404).send({ 'message': 'No events found' });
    // } else {
    //   if(zcoin<=snapShot.data().entryFee)
    //   {
    //     amount = snapShot.data().entryFee - zcoin;
    //     db.collection("Users").doc(email).update({ 'Zcoin': 0 });
    //   }
    //   else{
    //     amount = 0 ;
    //     db.collection("Users").doc(email).update({ 'Zcoin': zcoin - snapShot.data().entryFee });
    //   }
    // }
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
addPass = async (req, res) => {
  try {
    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;
    const pass = req.body.pass;
    const email = req.user.email;

    db.collection('payments').doc(razorpay_order_id).get()
      .then(async (docSnapshot) => {
        if (docSnapshot.exists) {
          res.status(200).json({ 'message': "Error in purchasing" })
        }
        else {
          const body = razorpay_order_id + "|" + razorpay_payment_id;

          const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
            .update(body.toString())
            .digest("hex");
          // console.log(expectedSignature);
          // console.log(razorpay_signature);

          const isAuthentic = (expectedSignature === razorpay_signature);

          if (isAuthentic) {

            try {
              const id = razorpay_order_id;
              const paymentJson = {
                email: email,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                signature: razorpay_signature
              }
              const response = await db.collection("payments").doc(id).set(paymentJson);

            } catch (error) {
              res.status(500).send(error.message);
            }

            let inc = 0;
            if (pass === "platinum") {
              inc = 6;
            }
            else if (pass === "gold") {
              inc = 5;
            }
            else if (pass === "silver") {
              inc = 3;
            }
            else if (pass === "bronze") {
              inc = 2;
            }
            else {
              inc = 0;
            }
            const inviter = db.collection('Users').doc(email);
            const resp = await inviter.update({
              eventPass: FieldValue.increment(inc)
            });
            res.status(200).send({ 'message': 'You have successfully purchased the Pass' });
          }
          else {
            res.status(200).send({ 'message': 'Invalid access' })
          }
        }
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
}


module.exports = {
  checkout,
  paymentVerification,
  passCheckout,
  addPass
};