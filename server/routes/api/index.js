const express = require("express");
const router = express.Router();
const appointments = require("./appointments");

router.use("/appointments", appointments);
router.use("/*", (req, res) => {
  return res.status(404).json({
    success: false,
    msg: `The requested URL was not found on this web service!`,
  });
});

module.exports = router;
