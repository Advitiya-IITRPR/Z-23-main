const express = require('express')
const { addEvents,addUser,getAllEvents,getEventList,getEventListAdvitya,getEventListZeitgeist,addEventPass,addEventWM,isEligible,updateEvent } = require("../controllers/events");
const verifyFirebaseToken = require('../middleware/auth');
const router = express.Router()

router.route('/addEvent').post(addEvents);
router.route('/allEvents').get(getAllEvents);
router.route('/ZeitgeistEvents').get(getEventListZeitgeist);
router.route('/AdvitiyaEvents').get(getEventListAdvitya);
router.route('/getEvents/:eventId').get(getEventList);
router.route('/addUsers').put(addUser);
router.route('/addEventPass').post(verifyFirebaseToken,addEventPass);
router.route('/addEventWM').put(verifyFirebaseToken,addEventWM);
router.route("/isEligible").post(verifyFirebaseToken,isEligible);
router.route("/updateEvent").post(updateEvent);

module.exports = router