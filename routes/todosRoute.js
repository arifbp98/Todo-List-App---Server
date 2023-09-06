const express = require("express");
const router = express.Router();
const controller = require("../controllers/todosController");

router.post("/", controller.createTodo);
router.get("/", controller.getAllTodos);
router.get("/user/:userId", controller.getAllTodosUser);
router.get("/:id", controller.getTodoById);
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;
