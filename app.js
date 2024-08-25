import express from "express";
import cors from 'cors'
import connectDB from "./utils/connection.js";
import movieRoutes from './routes/movieRoutes.js'
import { configDotenv } from "dotenv";
const app = express();

configDotenv();

(async () => {
    try {

        // register middlewares
        app.use(cors())
        app.use(express.json())
        app.use('/movie', movieRoutes)



        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, (err) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log(`Server started on PORT ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }

})();