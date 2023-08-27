const express = require("express");
const router = express.Router();
const users = require("./usersRoute");
const todos = require("./todosRoute");
const userController = require('../controllers/usersController')

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);

router.use("/api/user", users);
router.use("/api/todo", todos);

module.exports = router;
