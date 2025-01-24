import express from "express";

import connectToMongoDB from "./utils/connectToMongoDB.js";
import taskRoute from './routes/task.route.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/v1", taskRoute);


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    connectToMongoDB();
})
