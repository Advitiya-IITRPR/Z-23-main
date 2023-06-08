import React from 'react'
import axios from "axios";

const Button = ({ pass }) => {
    const email = "sakushwaha697@gmail.com";
    
    const checkoutHandler = async () => {
        const { data: { key } } = await axios.get("http://localhost:5000/api/getkey")

        const { data: { order } } = await axios.post("http://localhost:5000/api/passCheckout", {
            pass,
            email
        })
        
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: pass,
            description: "Zeitgeist Pass Purchasing section",
            image: "https://images.unsplash.com/photo-1528751394743-526cf5933226?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkYWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            order_id: order.id,
            handler: async function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
                await axios.put("http://localhost:5000/api/addPass/", {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    pass: pass,
                    email: email
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

    return (
        <button onClick={() => checkoutHandler()} style= {{border: "2px solid red"}}>purchase</button>
    )
}

export default Button