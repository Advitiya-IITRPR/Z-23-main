const firebase = require("./../config/firebase")
const admin = require("../config/admin");
const db = admin.firestore();
const shortid = require("shortid");
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'zeitgeist.pr@iitrpr.ac.in', // generated ethereal user
        pass: 'jozukfptllgqkvop' // generated ethereal password
    }
});

exports.addUserDetail = async(req, res) => {
    try {
        const id = req.user.email;
        const uid = "Z23" + req.body.name.slice(0, 3).toUpperCase() + (Date.now() % 10000000).toString().padStart(7, '0');
        const userJson = {
            name: req.body.name,
            email: req.user.email,
            dob: req.body.dob,
            YearOfPassing: req.body.YearOfPassing,
            gender: req.body.gender,
            phone: req.body.phone,
            collegeName: req.body.collegeName,
            collegeState: req.body.collegeState,
            Zcoin: 0,
            eventPass: 0,
            events: [],
            referrer_code: req.body.referral || "",
            referral_code: "Z23-" + shortid.generate(),
            uniqueId: uid
        };
        const doc = await db.collection("Users").doc(id).get();
        if (doc.exists) {
            return res.status(200).json({ "message": "You have already filled this form" });
        }
        const response = db.collection("Users").doc(id).set(userJson);
        // console.log("updated successfully");
        if (req.body.referral === "C") {
            const snapshot = await db.collection("CA").get()
            const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            list.forEach(async element => {
                if (element.referral_code === req.body.referral) {
                    const inviter = db.collection('CA').doc(element.email);
                    const res = await inviter.update({
                        invites: FieldValue.increment(1)
                    });
                }
            })
        }
        let mailOptions = {
            from: '"Zeitgeist " zeitgeist.pr@iitrpr.ac.in', // sender address
            to: `${req.user.email}`, // list of receivers
            subject: 'Registered successfully for Zeitgeist 23', // Subject line
            text: `Hello ${req.body.name}
            Greetings from Team Zeitgeist!
            Thank you for registering for our Zeitgeist 23! We are excited to have you join us and look forward to seeing you there.
            This email is to confirm your registration for the Zeitgeist 23. Please find your details of the below:
            Name : ${req.body.name}
            Unique ID : ${uid}
            Your Unique ID is important as you will register for events with it’s help. 
            We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates.
            If you have any questions or concerns, please feel free to contact us.
            Thank you once again for registering, and we can't wait to see you at the event!
            Best regards,
            Team Zeitgeist`,
            html: `<p>Hello <strong>${req.body.name}</strong>,<br>
            <p>Greetings from Team <b style="color:#ff9900">Zeitgeist!</b></p>
            <p>Thank you for registering for our <b style="color:#ff9900">Zeitgeist 23!</b> We are excited to have you join us and look forward to seeing you there.
            This email is to confirm your registration for the <b style="color:#ff9900">Zeitgeist 23</b>. Please find your details of the below:<br>
            Name : ${req.body.name}<br>
            Unique ID : ${uid}<br>
            <p>Your Unique ID is important as you will register for events with it’s help.<p> 
            <p>We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates.
            If you have any questions or concerns, please feel free to contact us.</p>
            <p>Thank you once again for registering, and we can't wait to see you at the event!</p>
            Best regards,<br>
            Team Zeitgeist<p>` // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            // console.log('Message sent: %s', info.messageId);
        });
        res.status(200).json({ "mesaage": "Registeration Successful" });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.getUserDetail = async(req, res) => {
    try {
        const snapshot = await db.collection("Users").get()
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        var temp
        list.forEach(element => {
            if (element.email === req.user.email) {
                temp = element
                res.status(200).json(element)
            }
        })
        if (temp === undefined || temp === null) { res.status(400).json("not found") }
    } catch (error) {
        console.log("error");
        res.status(500).send(error);
    }
}
exports.phoneUpdate = async(req, res) => {
    try {
        db.collection("Users").doc(req.user.email).update({ 'phone': req.body.phone });
        res.status(200).send("Phone Updated successfully");
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}