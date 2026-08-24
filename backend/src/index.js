import app from "./app.js";
import config from "./config.js";
import mongoose from "mongoose";

const PORT = config.PORT;
const mongoUrI = config.MONGO_URL;

// প্রথমে ডাটাবেজ কানেক্ট করুন, তারপর সার্ভার চালু করুন
mongoose.connect(mongoUrI)
    .then(() => {
        console.log("Database connected");
        
        // ডাটাবেজ কানেক্ট হওয়ার পর সার্ভার রান করবে
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Database connection failed:", error);
    });