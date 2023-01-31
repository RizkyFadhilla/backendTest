if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routers");
const cors = require("cors");
const pool = require("./config/connection");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
pool.connect(() => {
  app.listen(port, () => {
    console.log(`connect to port ${port}`);
  });
});
