import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import helmet from "helmet";
import app from "./server";
import globalMiddleware from "./middlewares/globalMiddlware";
import routerNotFound from "./middlewares/routerNotfound";

app.use(morgan("dev"));
app.use(helmet());

app.use(globalMiddleware);
app.use("/", routerNotFound);
