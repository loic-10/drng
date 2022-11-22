const express = require("express");
const cors = require("cors");
const app = express();
const { join, resolve } = require("path");

app.use(cors());

require("./database");
const index = require("./routes");

app.set("view engine", "html");
app.set("views", join(__dirname, "..", "client/build"));

app.use(express.static(join(__dirname, "..", "client/build")));

const PORT = process.env.PORT || 3000;

exports.app = app;

app.use(express.json());
app.use(index);

app.listen(PORT, () => {
  console.log(`DRNG, launch to http://localhost:${PORT}`);
});
