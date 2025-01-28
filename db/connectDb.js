import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected Successfully!`);
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB!`);
        console.error(error.stack); // Log the stack trace for detailed debugging
        throw error; // Re-throw the error to handle it in higher-level logic
    }
};

export default connectDb;
