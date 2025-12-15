const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Brand.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Brand.findAll();
    return res.json(types);
  }
  async remove(req, res) {
    const { id } = req.params;
    const brand = await Brand.findOne({ where: { id } });
    await Brand.destroy({ where: { id } });
    res.json({ brand });
  }
}

module.exports = new BrandController();
