const express = require("express");

require("./db/mongoose");

const userRouter = require("./router/user");
const taskRouter = require("./router/task");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Health Check!");
});

app.get("/v1", (req, res) => {
  res.send("Health Check for v1");
});

app.use("/v1/", userRouter);
app.use("/v1/", taskRouter);

module.exports = app;
