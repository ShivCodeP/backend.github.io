const express = require("express");

const Post = require("../models/post.model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const user = req.user;

      const post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        user: user.user._id,
      });

      return res.status(201).json({ post });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const posts = await Post.find().lean().exec();

  return res.send(posts);
});

module.exports = router;
