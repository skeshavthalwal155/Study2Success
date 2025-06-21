import React, { useEffect, useState } from 'react'

const PaymentHistory = () => {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const response = await fetch('/api/payments/paymentHistory', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }

                });
                console.log(response)
                const data = await response.json();
                if (data.success) {
                    setPayments(data.data);
                } else {
                    console.error('Failed to fetch payment history:', data.message);
                }
            } catch (error) {
                console.error('Error fetching payment history:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPaymentHistory();
    }, [])
    return (
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <h1 className="text-2xl font-bold mb-4">Payment History</h1>

        </div>
    )
}

export default PaymentHistory