const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router");

const app = express();
const port = 2100;

// Middleware
app.use(bodyParser.json());
app.use(require("cors")());

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
