const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getPosts,
  getOnePost,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/blogController");
router.route("/").get(getPosts).post(protect, addPost);
router
  .route("/:id")
  .get(getOnePost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);
module.exports = router;
