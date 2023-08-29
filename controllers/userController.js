const userModal = require("../models/userModal");
const bcrypt = require("bcryptjs");
exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModal.create({
      username: username,
      password: await bcrypt.hash(password, 12),
    });
    req.session.user = user;
    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "ERROR FROM SERVER",
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModal.findOne({
      username: username,
    });
    if (user) {
      const isVerified = await bcrypt.compare(password, user.password);
      if (isVerified) {
        req.session.user = user;
        return res.status(200).json({
          success: true,
          data: user,
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        error: "Invalid Credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "ERROR FROM SERVER",
    });
  }
};
