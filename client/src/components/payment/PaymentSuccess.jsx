import React from 'react'
import { useSearchParams } from "react-router-dom"
const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
                <div className="success">
                    <h2> Order Successfull</h2>

                    <p>
                        Reference No.{referenceNum}
                    </p>
                </div>
    )
}

export default PaymentSuccess