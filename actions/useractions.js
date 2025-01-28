"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

// Initialize Razorpay payment
export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();
    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({ username: to_username });
    const secret = user.razorpaysecret;

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret });

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options);

    // create a payment object which shows a pending payment in the database
    await Payment.create({ oid: x.id, amount: amount / 100, to_user: to_username, name: paymentform.name, message: paymentform.message });

    return x;
}


export const fetchuser = async (username) => {
    await connectDb();
    let u = await User.findOne({ username: username });
    let user = u.toObject({ flattenObjectIds: true });
    return user;
}

// Fetch payments for a user
export const fetchpayments = async (username) => {
    try {
        await connectDb();

        const payments = await Payment.find({ to_user: username, done: true })
            .sort({ amount: -1 })
            .lean();

        // Transform `_id` and `createdAt` to plain values
        const transformedPayments = payments.map((payment) => ({
            ...payment,
            _id: payment._id.toString(), // Convert ObjectId to string
            createdAt: payment.createdAt?.toISOString(), // Convert Date to ISO string
            updatedAt: payment.updatedAt?.toISOString(), // Convert Date to ISO string
        }));

        return transformedPayments;
    } catch (error) {
        console.error("Error in fetchpayments:", error.message);
        throw new Error("Failed to fetch payments");
    }
};


// Update user profile
export const updateProfile = async (data, oldusername) => {
    await connectDb();
    let ndata = Object.fromEntries(data);

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username });
        if (u) {
            return { error: "Username already exists" };
        }
        await User.updateOne({ email: ndata.email }, ndata);
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username });
    }
    else {
        await User.updateOne({ email: ndata.email }, ndata);
    }
}