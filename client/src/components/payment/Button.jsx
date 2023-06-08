import React from 'react'
import axios from "axios";
import { toast } from 'react-hot-toast';

const Button = ({ event }) => {
    const email = "sakushwaha697@gmail.com";
    
    const checkoutHandler = async () => {
        const { data: { key } } = await axios.get("http://localhost:5000/api/getkey")

        const isEligible = await axios.post("http://localhost:5000/events/isEligible/",{
            email,
            event
        });
        console.log(isEligible.data);
        if(isEligible.data)
        {
            const {data: {name, imageUrl,}} = await axios.get(`http://localhost:5000/events/getEvents/${event}`)

            const { data: { order } } = await axios.post("http://localhost:5000/api/checkout", {
                event,
                email
            })
            console.log(order.amount);
            if(order.amount>0)
            {
                const options = {
                    key,
                    amount: order.amount,
                    currency: "INR",
                    name: event,
                    description: "Zeitgeist Event Registeration",
                    image: imageUrl,
                    order_id: order.id,
                    handler: async function (response) {
                        alert(response.razorpay_payment_id);
                        alert(response.razorpay_order_id);
                        alert(response.razorpay_signature);
                        await axios.put("http://localhost:5000/events/addUsers/", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            eventId: event,
                            newParticipants: email
                        })
                    },
                    // callback_url: "http://localhost:5000/api/paymentverification",
                    prefill: {
                        name: "",
                        email: email,
                        contact: ""
                    },
                    notes: {
                        "address": "Razorpay Corporate Office"
                    },
                    theme: {
                        "color": "#121212"
                    }
                };
                const razor = new window.Razorpay(options);
                razor.on('payment.failed', function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                razor.open();
            }
            else
            {
                await axios.put("http://localhost:5000/events/addEventWM/", {
                        eventId: event,
                        newParticipants: email
                    })
            }
        }
        else{
            toast("You can't register first verify your mail or you have already registered for the event")
        }
        
    }

    return (
        <button onClick={() => checkoutHandler()} >Buy Now</button>
    )
}

export default Button