const Post = require("../models/blogModal");
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findById(id);
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const posts = await Post.create({
      title: title,
      description: description,
    });
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const posts = await Post.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
