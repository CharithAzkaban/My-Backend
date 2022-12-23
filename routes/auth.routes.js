const express = require("express");

const { registerUser, loginUser } = require("../controllers/auth");

const router = express.Router();

router.post("/loginUser", loginUser);
router.post("/registerUser", registerUser);

module.exports = router;
