import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import app from "./server";
import globalMiddleware from "./middlewares/globalMiddlware";
import routerNotFound from "./middlewares/routerNotfound";
import router from "./routes";

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000/",
    })
);
app.use("/", router);
app.use(globalMiddleware);
app.use("/", routerNotFound);
