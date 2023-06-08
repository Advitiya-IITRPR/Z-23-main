const express =  require("express");
const {
  checkout,
  paymentVerification,
  passCheckout,
  addPass
} = require("../controllers/paymentController.js");
const verifyFirebaseToken = require("../middleware/auth.js");

const router = express.Router();

router.route("/checkout").post(verifyFirebaseToken,checkout);
router.route("/paymentverification").post(paymentVerification);
router.route('/passCheckout').post(verifyFirebaseToken,passCheckout);
router.route('/addPass').put(verifyFirebaseToken,addPass);

// export default router;
module.exports = router;
