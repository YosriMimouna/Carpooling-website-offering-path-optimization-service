const express = require ("express");

const PostController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();



router.post(
  "",
  checkAuth,
  extractFile,
  PostController.createPost);

router.put(
  "/:id",
  checkAuth,
  extractFile,
  PostController.updatePost
  );

router.post(
  "/userCard",
  PostController.addUserCard);

router.get(
  "/optMap",
  PostController.getSmartSol
);

router.get("/userCard/:id" , PostController.getUserCard);

router.get("" , PostController.getPosts);

router.get("/:id", PostController.getSinglePost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
