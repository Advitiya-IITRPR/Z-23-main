const admin = require('../config/admin')
const db = admin.firestore()
const crypto = require("crypto");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const nodemailer = require('nodemailer');
const { use } = require('../routes/profile');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'zeitgeist.pr@iitrpr.ac.in', // generated ethereal user
        pass: 'jozukfptllgqkvop'  // generated ethereal password
    }
});


exports.addEvents = async (req, res) => {
    try {
        const data = req.body;
        const event = await db.collection('events').doc(req.body.name).set(data);
        res.status(200).send({ 'message': 'Event added successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}
exports.updateEvent = async (req, res) =>{
    try {
        const data = req.body;
        const event = await db.collection('events').doc(req.body.name).update(data);
        res.status(200).send({ 'message': 'Event updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}
exports.getAllEvents = async (req, res) => {
    try {
        const snapshot = await db.collection("events").get();
        var list
        if (!req.query.category) {
            list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        } else {
            list = snapshot.docs.map((doc) => (doc.data().category === req.query.category) ? ({ id: doc.id, ...doc.data() }) : null);
            list = list.filter((item) => item);
        }
        return res.status(200).send(list);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}
exports.getEventListZeitgeist = async (req, res) => {
    try {
        const snapShot = await db.collection("events").get();
        if (snapShot.empty) {
            return res.status(404).send({ 'message': 'No events found' });
        } else {
            const zeitgeistEvents = [];
            snapShot.forEach(doc => {
                if (!doc.data().isAdvitiya) {
                    // const event = {
                    //     name: doc.data().name,
                    //     description: doc.data().description,
                    //     imageUrl: doc.data().imageUrl,
                    //     category: doc.data().category,
                    //     entryFee: doc.data().entryFee,
                    //     cashPrize: doc.data.cashPrize,
                    //     rulebookLink: doc.data().rulebookLink
                    // }

                    zeitgeistEvents.push(doc.data());
                }
            })
            res.status(200).send(zeitgeistEvents);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.getEventListAdvitya = async (req, res) => {
    try {
        const snapShot = await db.collection("events").get();

        if (snapShot.empty) {
            return res.status(404).send({ 'message': 'No events found' });
        } else {
            const advitiyaEvents = [];
            snapShot.forEach(doc => {
                if (doc.data().isAdvitiya) {
                    const event = {
                        // name: doc.data().name,
                        // description: doc.data().description,
                        // imageUrl: doc.data().imageUrl,
                        // category: doc.data().category,
                        // entryFee: doc.data().entryFee,
                        // cashPrize: doc.data.cashPrize,
                        // rulebookLink: doc.data().rulebookLink
                    }
                    
                    advitiyaEvents.push(doc.data());
                }

            })
            res.status(200).send(advitiyaEvents);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.getEventList = async (req, res) => {

    var eventId = req.params.eventId;

    try {
        const snapShot = await db.collection("events").doc(eventId).get();
        if (snapShot.empty) {
            res.status(404).send({ 'message': 'No events found' });
        } else {
            // const event = {
            //     name: snapShot.data().name,
            //     description: snapShot.data().description,
            //     imageUrl: snapShot.data().imageUrl,
            //     category: snapShot.data().category,
            //     entryFee: snapShot.data().entryFee,
            //     cashPrize: snapShot.data().cashPrize,
            //     rulebookLink: snapShot.data().rulebookLink
            // }
            return res.status(200).send(snapShot.data());
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.addUser = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, eventId } = req.body;
        const newParticipants = req.user.email;

        db.collection('payments').doc(razorpay_order_id).get()
            .then(async (docSnapshot) => {
                if (docSnapshot.exists) {
                    res.status(200).json({ 'message': "Error in registering" })
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
                                orderId: razorpay_order_id,
                                paymentId: razorpay_payment_id,
                                signature: razorpay_signature,
                                email: newParticipants
                            }
                            const response = await db.collection("payments").doc(id).set(paymentJson);

                        } catch (error) {
                            res.status(500).send(error.message);
                        }

                        const user = db.collection('Users').doc(newParticipants);
                        const unionRes = await user.update({
                            events: FieldValue.arrayUnion(eventId)
                        });
                        const userDetail = await user.get();
                        const name = userDetail.data().name;
                        const college = userDetail.data().collegeName;
                        const phone = userDetail.data().phone;
                        const uniqueId = userDetail.data().uniqueId;
                        const data = {
                            uniqueId: uniqueId,
                            name: name,
                            email: newParticipants,
                            college: college,
                            phone: phone
                        }
                        const snapShot = db.collection('events').doc(eventId);
                        const response = await snapShot.update({
                            participantList: FieldValue.arrayUnion(data),
                            participants: FieldValue.increment(1)
                        });
                        const zcoin = userDetail.data().Zcoin;
                        const uid= userDetail.data().uniqueId;
                        const eventdetails = await snapShot.get();
                        const fee = eventdetails.data().entryFee;
                        const isGroupEvent = eventdetails.data().isGroupEvent;
                        db.collection("Users").doc(newParticipants).update({ 'Zcoin': 0 });

                        const referral = userDetail.data().referrer_code;
                        if (referral !== "") {
                            if (referral.charAt(0) === 'Z') {
                                const snapshot = await db.collection("Users").get()
                                const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                                list.forEach(async element => {
                                    if (element.referral_code === referral) {
                                        const inviter = db.collection('Users').doc(element.email);
                                        const res = await inviter.update({
                                            Zcoin: FieldValue.increment(50)
                                        });
                                    }
                                })
                            }
                            else {
                                const snapshot = await db.collection("CA").get()
                                const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                                list.forEach(async element => {
                                    if (element.referral_code === referral) {
                                        const inviter = db.collection('CA').doc(element.email);
                                        const res = await inviter.update({
                                            points: FieldValue.increment(50)
                                        });
                                    }
                                })
                            }
                        }
                        let mailOptions
                        if (isGroupEvent) {
                            const flink = eventdetails.data().formLink;
                            mailOptions = {
                                from: '"Zeitgeist "advitiya@iitrpr.ac.in', // sender address
                                to: `${newParticipants}`, // list of receivers
                                subject: 'Event Registeration Confirmation', // Subject line
                                text: `Hello ${name},
                                Thank you for registering for our event! We are excited to have you join us and look forward to seeing you there.
                                This email is to confirm your registration for the event. Please find the details of the event below:
                                Name : ${name}
                                Unique ID : ${uid}
                                Event name: ${eventId}
                                We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates. All the information regarding the date, time and venue will be conveyed to you within time. 
                                If you have any questions or concerns, please feel free to contact the event coordinators as mentioned in the rulebook of the event.
                                Thank you once again for registering, and we are really excited to see you at the event!
                                Best regards,
                                Team Zeitgeist`,
                                html: `<p>Hello <b>${name}</b>,<br>
                                <p>Thank you for registering for our event! We are excited to have you join us and look forward to seeing you there.
                                This email is to confirm your registration for the event. Please find the details of the event below:</p>
                                Name : ${name}<br>
                                Unique ID : ${uid}<br>
                                Event name: ${eventId}<br>
                                <p>We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates. All the information regarding the date, time and venue will be conveyed to you within time. 
                                If you have any questions or concerns, please feel free to contact the event coordinators as mentioned in the rulebook of the event.</p>
                                <p>Thank you once again for registering, and we are really excited to see you at the event!</p>
                                Best regards,<br>
                                Team Zeitgeist</p>`
                            };
                        }
                        else {
                            mailOptions = {
                                from: '"Zeitgeist "advitiya@iitrpr.ac.in', // sender address
                                to: `${newParticipants}`, // list of receivers
                                subject: 'Event Registeration Confirmation', // Subject line
                                text: `Hello ${name},
                                Thank you for registering for our event! We are excited to have you join us and look forward to seeing you there.
                                This email is to confirm your registration for the event. Please find the details of the event below:
                                Name : ${name}
                                Unique ID : ${uid}
                                Event name: ${eventId}
                                We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates. All the information regarding the date, time and venue will be conveyed to you within time. 
                                If you have any questions or concerns, please feel free to contact the event coordinators as mentioned in the rulebook of the event.
                                Thank you once again for registering, and we are really excited to see you at the event!
                                Best regards,
                                Team Zeitgeist`,
                                html: `<p>Hello <b>${name}</b>,<br>
                                <p>Thank you for registering for our event! We are excited to have you join us and look forward to seeing you there.
                                This email is to confirm your registration for the event. Please find the details of the event below:</p>
                                Name : ${name}<br>
                                Unique ID : ${uid}<br>
                                Event name: ${eventId}<br>
                                <p>We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates. All the information regarding the date, time and venue will be conveyed to you within time. 
                                If you have any questions or concerns, please feel free to contact the event coordinators as mentioned in the rulebook of the event.</p>
                                <p>Thank you once again for registering, and we are really excited to see you at the event!</p>
                                Best regards,<br>
                                Team Zeitgeist</p>`
                            };
                        }
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                        });

                        res.status(200).send({ 'message': 'You have successfully registered for the event' });
                    }
                    else {
                        res.status(200).send({ 'message': 'Invalid access' })
                    }
                }
            });



    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}
exports.addEventPass = async (req, res) => {
    try {
        const email = req.user.email;
        const eventId = req.body.eventId;
        const user = await db.collection('Users').doc(email).get();
        if (user.data().eventPass > 0) {

            const unionRes = await db.collection('Users').doc(email).update({
                eventPass: FieldValue.increment(-1),
                events: FieldValue.arrayUnion(eventId)
            });
            const name = user.data().name;
            const college = userDetail.data().collegeName;
            const phone = userDetail.data().phone;
            const uniqueId = userDetail.data().uniqueId;
            const data = {
                uniqueId: uniqueId,
                name: name,
                email: email,
                college: college,
                phone: phone
            }
            const snapShot = db.collection('events').doc(eventId);
            const response = await snapShot.update({
                participantList: FieldValue.arrayUnion(data)
            });

            const referral = user.data().referrer_code;
            if (referral !== "") {
                if (referral.charAt(0) === 'Z') {
                    const snapshot = await db.collection("Users").get()
                    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                    list.forEach(async element => {
                        if (element.referral_code === referral) {
                            const inviter = db.collection('Users').doc(element.email);
                            const res = await inviter.update({
                                Zcoin: FieldValue.increment(50)
                            });
                        }
                    })
                }
                else {
                    const snapshot = await db.collection("CA").get()
                    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                    list.forEach(async element => {
                        if (element.referral_code === referral) {
                            const inviter = db.collection('CA').doc(element.email);
                            const res = await inviter.update({
                                points: FieldValue.increment(50)
                            });
                        }
                    })
                }

            }
            let mailOptions = {
                from: '"Zeitgeist "zeitgeist.pr@iitrpr.ac.in', // sender address
                to: `${newParticipants}`, // list of receivers
                subject: 'Event Registeration Confirmation', // Subject line
                text: `Congragulation ${name} You have successfully registered for the ${eventId} for the annual fest of IIT Ropar`, // plain text body
                html: `<b>Congragulation ${name}</b> <p>You have successfully registered for the ${eventId} for the annual fest of IIT Ropar </p>` // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
            res.status(200).send({ 'message': 'You have successfully registered for the event' });
        }
        else {
            res.status(200).send({ 'message': 'First Purchase any Pass' })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.addEventWM = async (req, res) => {
    try {
        const email = req.user.email;
        const eventId = req.body.eventId;
        const user = await db.collection('Users').doc(email).get();

        const name = user.data().name;
        const college = userDetail.data().collegeName;
        const phone = userDetail.data().phone;
        const uniqueId = userDetail.data().uniqueId;
        const data = {
            uniqueId: uniqueId,
            name: name,
            email: email,
            college: college,
            phone: phone
        }
        const snapShot = db.collection('events').doc(eventId);
        const eventDetails = await snapShot.get();

        const entryFee = eventDetails.data().entryFee;
        const isGroupEvent = eventDetails.data().isGroupEvent;
        if (user.data().Zcoin < entryFee) {
            return res.status(200).send({ "message": "You don't have enough Zcoin" })
        }
        const unionRes = await db.collection('Users').doc(email).update({
            events: FieldValue.arrayUnion(eventId),
            Zcoin: FieldValue.increment(-1 * entryFee)
        });
        const response = await snapShot.update({
            participantList: FieldValue.arrayUnion(data),
        });

        const referral = user.data().referrer_code;
        if (referral !== "") {
            if (referral.charAt(0) === 'Z') {
                const snapshot = await db.collection("Users").get()
                const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                list.forEach(async element => {
                    if (element.referral_code === referral) {
                        const inviter = db.collection('Users').doc(element.email);
                        const res = await inviter.update({
                            Zcoin: FieldValue.increment(50)
                        });
                    }
                })
            }
            else {
                const snapshot = await db.collection("CA").get()
                const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                list.forEach(async element => {
                    if (element.referral_code === referral) {
                        const inviter = db.collection('CA').doc(element.email);
                        const res = await inviter.update({
                            points: FieldValue.increment(50)
                        });
                    }
                })
            }
        }
        let mailOptions
        if (isGroupEvent) {
            const flink = eventdetails.data().formLink;
            mailOptions = {
                from: '"Zeitgeist "advitiya@iitrpr.ac.in', // sender address
                to: `${newParticipants}`, // list of receivers
                subject: 'Event Registeration Confirmation', // Subject line
                text: `Hello ${name},
                    Thank you for registering for our event! We are excited to have you join us and look forward to seeing you there.
                    This email is to confirm your registration for the event. Please find the details of the event below:
                    Name : ${name}
                    Unique ID : ${uniqueId}
                    Event name: ${eventId}
                    We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates. All the information regarding the date, time and venue will be conveyed to you within time. 
                    If you have any questions or concerns, please feel free to contact the event coordinators as mentioned in the rulebook of the event.
                    Thank you once again for registering, and we are really excited to see you at the event!
                    Best regards,
                    Team Zeitgeist`,
                html: `<p>Hello <b>${name}</b>,<br>
                    <p>Thank you for registering for our event! We are excited to have you join us and look forward to seeing you there.
                    This email is to confirm your registration for the event. Please find the details of the event below:</p>
                    Name : ${name}
                    Unique ID : ${uniqueId}
                    Event name: ${eventId}
                    <p>We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates. All the information regarding the date, time and venue will be conveyed to you within time. 
                    If you have any questions or concerns, please feel free to contact the event coordinators as mentioned in the rulebook of the event.</p>
                    <p>Thank you once again for registering, and we are really excited to see you at the event!</p>
                    Best regards,<br>
                    Team Zeitgeist</p>`
            };
        }
        else {
            mailOptions = {
                from: '"Zeitgeist "advitiya@iitrpr.ac.in', // sender address
                to: `${newParticipants}`, // list of receivers
                subject: 'Event Registeration Confirmation', // Subject line
                text: `Hello ${name},
                Thank you for registering for our event! We are excited to have you join us and look forward to seeing you there.
                This email is to confirm your registration for the event. Please find the details of the event below:
                Name : ${name}
                Unique ID : ${uniqueId}
                Event name: ${eventId}
                We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates. All the information regarding the date, time and venue will be conveyed to you within time. 
                If you have any questions or concerns, please feel free to contact the event coordinators as mentioned in the rulebook of the event.
                Thank you once again for registering, and we are really excited to see you at the event!
                Best regards,
                Team Zeitgeist`,
                html: `<p>Hello <b>${name}</b>,<br>
                <p>Thank you for registering for our event! We are excited to have you join us and look forward to seeing you there.
                This email is to confirm your registration for the event. Please find the details of the event below:</p>
                Name : ${name}
                Unique ID : ${uniqueId}
                Event name: ${eventId}
                <p>We will be sending you additional information about the event closer to the date, so please keep an eye on your inbox for further updates. All the information regarding the date, time and venue will be conveyed to you within time. 
                If you have any questions or concerns, please feel free to contact the event coordinators as mentioned in the rulebook of the event.</p>
                <p>Thank you once again for registering, and we are really excited to see you at the event!</p>
                Best regards,<br>
                Team Zeitgeist</p>`
            };
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
        res.status(200).send({ 'message': 'You have successfully registered for the event' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.isEligible = async (req, res) => {
    try {
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
            res.status(200).json(false)
        }
        else {
            if (!req.user.email_verified) {
                return res.status(200).send(false);
            }
            else {
                if (user.events.includes(eventId)) {
                    res.status(200).send(false);
                }
                else {
                    res.status(200).send(true);
                }
            }
        }


    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}
