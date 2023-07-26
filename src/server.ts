import "./dbs/mongo.init";
import express from "express";
const app = express();
app.listen(process.env.DEV_APP_PORT, () => {
    console.log("Sever is running PORT " + process.env.DEV_APP_PORT);
});

export default app;
