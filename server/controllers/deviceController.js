const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      console.log("CREATE DEVICE");
      console.log(req.body);

      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        const parsedInfo = JSON.parse(info);
        await Promise.all(
          parsedInfo.map(async ({ title, description }) => {
            if (title === "" || description === "") {
              return null;
            }

            await DeviceInfo.create({
              title,
              description,
              deviceId: device.id,
            });
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequerst(e.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
  async update(req, res, next) {
    try {
      console.log("UPDATE DEVICE");
      const { id } = req.params;
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files || {};

      const device = await Device.findOne({ where: { id } });

      if (img) {
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        device.img = fileName;
      }
      if (name) {
        device.name = name;
      }
      if (price) {
        device.price = JSON.stringify(price);
      }
      if (brandId) {
        device.brandId = brandId;
      }
      if (typeId) {
        device.typeId = typeId;
      }
      if (info) {
        await DeviceInfo.destroy({ where: { deviceId: id } });

        await Promise.all(
          info.map(async ({ title = "", description = "" }) => {
            if (!title || !description) return null;

            return DeviceInfo.create({
              title,
              description,
              deviceId: device.id,
            });
          })
        );
      }
      await device.save();
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequerst(e.message));
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({ where: { id } });
    await Device.destroy({ where: { id } });
    res.json({ device });
  }
}

module.exports = new DeviceController();
