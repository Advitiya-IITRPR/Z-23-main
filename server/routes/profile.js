const firebase = require("./../config/firebase");
const admin = require("./../config/admin");
const express = require('express')
const { getUserDetail, addUserDetail, phoneUpdate } = require("../controllers/profile");
const verifyFirebaseToken = require("../middleware/auth");
const router = express.Router()

router.route('/getUser').get(verifyFirebaseToken,getUserDetail)
router.route('/addUser').post(verifyFirebaseToken,addUserDetail)
router.route('/phoneUpdate').post(verifyFirebaseToken,phoneUpdate)

module.exports = router