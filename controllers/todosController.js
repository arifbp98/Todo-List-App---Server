const { todos } = require("../models");

class Controller {
  static async createTodo(req, res) {
    try {
      const { activity, completed, userId } = req.body;
      const data = await todos.create({ activity, completed, userId });
      res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAllTodos(req, res) {
    try {
      const data = await todos.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAllTodosUser(req, res) {
    try {
      const { userId } = req.params;
      const data = await todos.findAll({ where: { userId } });
      res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getTodoById(req, res) {
    try {
      const { id } = req.params;
      const data = await todos.findAll({ where: { id } });
      if (!data) {
        res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const data = await todos.findByPk(id);
      if (!data) {
        res.status(404).json({ message: "Todo not found" });
      }
      const { activity, completed, userId } = req.body;
      todos.update({ activity, completed, userId }, { where: { id } });
      res.status(200).json({ message: `Todo id ${id} updated.` });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const data = await todos.findByPk(id);
      if (!data) {
        res.status(404).json({ message: "Todo not found." });
      }
      todos.destroy({ where: { id } });
      res.status(200).json({ message: `Todo id ${id} deleted.` });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Controller;
