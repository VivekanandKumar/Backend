import mongoose from "mongoose";
/**
 * Connect mongo database
 */
const connectDB = async () => {
    try {

        // event handler if database connected successfull or failed to connect
        mongoose.connection.on("connected", () => {
            console.log("Connected to database successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.log("Error in connecting to database.", err);
        });
        await mongoose.connect(process.env.MONGOURI);
    } catch (err) {
        console.error("Failed to connect to database.", err);
        process.exit(1);
    }
};

export default connectDB;