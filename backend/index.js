import "dotenv/config";
import express from "express";
import { initWebRoutes } from "./routes/webRoute.js";
import bodyParser from "body-parser";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import cors from "cors";
import viewEngine from "./Engine/viewEngine.js";
import sequelize from "./services/SequelizeConnection.js";
const PORT = process.env.APP_PORT || 8080;

const app = express();
viewEngine(app);
app.use(express.static("public"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "websukien:",
});

app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: process.env.SESSION_SECRET || "keyboard cat",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
})
.catch((err) => {
  console.log("Connect DB fail", err);
});
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
