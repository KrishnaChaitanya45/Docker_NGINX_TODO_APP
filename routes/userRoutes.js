const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/userController");
router.route("/signUp").post(signUp);
router.route("/logIn").post(signIn);
module.exports = router;
