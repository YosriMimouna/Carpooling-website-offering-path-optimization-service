const express = require("express");

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/user');
const extractFile = require('../middleware/file');

const router = express.Router();

router.post('/signup', extractFile, UserController.createUser);

router.post('/login', UserController.userLogin);

//router.get('/passnegrCard', checkAuth, UserController.getUserInfo);

router.put("/profile/:id", checkAuth, UserController.updateUser);

router.get("/:id", UserController.getUserInfo);

router.put("/notif/:id", checkAuth, UserController.notifParticipate);

module.exports = router;
