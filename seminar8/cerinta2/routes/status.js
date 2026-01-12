const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Serverul functioneaza",
  });
});

module.exports = router;
