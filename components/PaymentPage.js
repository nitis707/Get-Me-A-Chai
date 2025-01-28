"use client"
import React, { useEffect, useState } from "react"
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setPayments] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`);

    }, []);


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    }

    const getData = async () => {
        let u = await fetchuser(username);
        setcurrentUser(u);
        let dbpayments = await fetchpayments(username);
        setPayments(dbpayments);
    }


    const pay = async (amount) => {
        // Get the order Id 
        let a = await initiate(amount, username, paymentform);
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Nitish Singh", //your customer's name
                "email": "test@example.com",
                "contact": "7700818886" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className="cover w-full relative">
                <img className="w-full h-[350] object-cover" src={currentUser.coverpic} alt="banner" />

                <div className="absolute -bottom-14 right-[47%] border-white border-2 overflow-hidden rounded-full">
                    <img className="rounded-full h-[100px]" width={100} height={100} src={currentUser.profilepic} alt="profile image" />
                </div>
            </div>

            <div className="info flex flex-col justify-center items-center gap-2 mt-20 mb-10">
                <div className="font-bold text-lg">
                    {username}
                </div>
                <div className="text-slate-300">
                    Creating Animated Art for VTT's
                </div>

                <div className="text-slate-300">
                    9,719 members, 82 posts, $15,450/release
                </div>
            </div>

            <div className="payment flex gap-3 w-[80%] container mx-auto pb-10">
                <div className="supporters w-1/2 bg-slate-900 rounded-lg p-6">
                    <h2 className="font-bold text-2xl mb-5">Supporters</h2>
                    <ul className="mx-5 text-base max-h-64 overflow-y-auto">
                        {payments.length === 0 && <li>No payments yet</li>}
                        {payments.map((p, i) => (
                            <li key={i} className="my-2 flex gap-2 items-center">
                                <img width={33} src="avatar.gif" alt="user avatar" />
                                <span>
                                    {p.name} donated <span className="font-bold">₹{p.amount}</span> with a message &quot;{p.message}&quot;
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="makepayment w-1/2 bg-slate-900 rounded-lg p-6">
                    <h2 className="font-bold text-2xl mb-5">Support Nitish Singh</h2>

                    <div className="flex gap-2 flex-col">
                        <input onChange={handleChange} value={paymentform.name} name="name" type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter your name" />

                        <input onChange={handleChange} value={paymentform.message} name="message" type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter message..." />

                        <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter amount..." />

                        <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className="btns w-full bg-slate-800 p-3 rounded-lg disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                    </div>

                    <div className="flex gap-2 mt-5">
                        <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(1000)}>
                            Pay ₹10
                        </button>
                        <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(2000)}>
                            Pay ₹20
                        </button>
                        <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(3000)}>
                            Pay ₹30
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage;