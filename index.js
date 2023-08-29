const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  REDIS_PORT,
  REDIS_IP,
  SESSION_SECRET,
  MONGO_PORT,
} = require("./config/config");
const redis = require("redis");
let RedisStore = require("connect-redis").default;
let redisClient = redis.createClient({
  socket: {
    host: REDIS_IP,
    port: REDIS_PORT,
  },
});

const userRoutes = require("./routes/userRoutes");
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

require("dotenv").config();
const blogRouter = require("./routes/blogRoutes");
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
//depends on method in the docker-compose file starts the mongo container before the node but it doesn't guarentte you that it would wait and connect to mongo before running the node, so we cannot just reply on it so instead we can use a method which retries to connect to the mongo until it is connected
const connectUntilSuccess = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
      setTimeout(connectUntilSuccess, 5000);
    });
};
connectUntilSuccess();
redisClient
  .connect()
  .then(() => console.log("connected to redis"))
  .catch((err) => console.log(err));
app.enable("trust proxy");
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: { secure: false, httpOnly: true, maxAge: 30000 },
  })
);
app.use("/api/v1/posts", blogRouter);
app.use("/api/v1/auth", userRoutes);
app.get("/api", (req, res) => {
  console.log("Yeahh it is working");
  res.send("<h1>sdfd sds  !!!  </h1>");
});
app.listen(port, () => console.log(`Listening on port ${port}...`));
