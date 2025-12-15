const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
  async remove(req, res) {
    try {
      const { id } = req.params;
      const type = await Type.findOne({ where: { id } });
      console.log("DELETE TYPE", type);
      await Type.destroy({ where: { id } });
      res.json({ type });
    } catch (e) {
      next(ApiError.badRequerst("Problem with delete"));
    }
  }
}

module.exports = new TypeController();
