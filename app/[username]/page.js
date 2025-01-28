import PaymentPage from "@/components/PaymentPage";
import React from "react";
import { notFound } from "next/navigation";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

const Username = async ({ params }) => {
    const { username } = await params;

    // Connect to the database
    await connectDb();

    // Check if the user exists in the database
    const u = await User.findOne({ username });

    if (!u) {
        notFound(); // Trigger 404 if user is not found
    }

    return <PaymentPage username={username} />;
};

export default Username;

export async function generateMetadata({ params }) {
    const { username } = await params;

    return {
        title: `Support ${username} - Get Me A Chai`,
    };
};
