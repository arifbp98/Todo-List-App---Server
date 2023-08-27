const { users } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { hashPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const hashedPassword = hashPassword(password, 8);
      const data = await users.create({
        email,
        password: hashedPassword,
        name,
      });
      res.status(200).json({ message: `New user with id ${data.id} created.` });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await users.findOne({ where: { email } });
      if (!data) {
        res.status(400).json({ message: "Invalid Credentials" });
      }
      const validPassword = comparePassword(password, data.password);
      if (!validPassword) {
        res.status(400).json({ message: "Invalid Credentials" });
      }
      const token = generateToken({ id: data.id });
      res.status(200).json({ id: data.id, token });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const data = await users.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const data = await users.findByPk(id);
      if (!data) {
        res.status(404).json({ message: "User not found" });
      }
      const { email, password, name } = req.body;
      const hashedPassword = hashPassword(password, 8);
      users.update(
        { email, password: hashedPassword, name },
        { where: { id } }
      );
      res.status(200).json({ message: `User id ${id} updated.` });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Controller;
