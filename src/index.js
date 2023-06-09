const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const authorizationHandler = require("../auth/router");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect();

app.use(cors());

app.use(cookieParser());

app.use(bodyParser.json());

app.use(authorizationHandler(db));

app.get("/", (req, res) => {
  res.send(`${JSON.stringify(req.cookies)}`);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
