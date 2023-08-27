const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

router.get("/", controller.getAllUsers);
router.put("/:id", controller.updateUser);

module.exports = router;
