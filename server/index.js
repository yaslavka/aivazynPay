require("dotenv").config();
const { createServer } = require("node:http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dayjs = require("dayjs");
const TelegramBot = require("node-telegram-bot-api");
const app = express();
require("dayjs/locale/ru");
const isBetween = require("dayjs/plugin/isBetween");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
const relativeTime = require("dayjs/plugin/relativeTime");
const localizedFormat = require("dayjs/plugin/localizedFormat");
const sequelize = require("./db.js");
const bot = new TelegramBot(process.env.TOKEN, { polling: true });
const BotController = require("./src/Controllers/BotController");
const PayController = require("./src/Controllers/PayController");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale("ru");
const serve = createServer(app);
app.use("/", express.static(path.resolve(__dirname, "public")));
app.use(
  "/html/payForm/success",
  express.static(path.resolve(__dirname, "public")),
);

app.post("/api/v2/rest/inner/notify", async (req, res) => {
  await PayController.payS(req, res, bot);
});

//
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await BotController.startBot(bot);
    await BotController.botRules(bot);
    serve.listen(5074, () => console.log(`server started on port 5074`));
  } catch (e) {
    console.log(e);
  }
})();
