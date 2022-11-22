const express = require("express");
const router = express.Router();
const api = require("./api");
const { join } = require("path");
router.use("/api", api);

router.get("/*", (req, res) => {
  const file = join(__dirname, "../..", "client/build", "index.html");
  console.log({ file });
  res.sendFile(file);
});

router.post("/*", (req, res) => {
  const file = join(__dirname, "../..", "client/build", "index.html");
  console.log({ file });
  res.sendFile(file);
});

module.exports = router;
