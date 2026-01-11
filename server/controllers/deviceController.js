const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Type } = require("../models/models");
const { Brand } = require("../models/models");
const cloudinaryService = require("../middleware/cloudinaryService");
const fs = require("fs");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      console.log("CREATE DEVICE");
      console.log(req.body);

      const { img } = req.files;

      // let fileName = uuid.v4() + ".jpg";
      // img.mv(path.resolve(__dirname, "..", "static", fileName));

      // const cloudinaryResult = await cloudinaryService.uploadImage("static/" + fileName);
      const buffer = img.data; // express-fileupload дає буфер файлу

      const cloudinaryResult = cloudinaryService.uploadImage(buffer);

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: cloudinaryResult.public_id,
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
    try {
      console.log("Get all devices query params:", req.query);

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

      console.log("Found devices:", devices.rows.length);

      // Додаємо повні URL до кожного девайсу
      const devicesWithUrls = devices.rows.map((device) => ({
        ...device.toJSON(),
        imgUrl: cloudinaryService.getOptimizedImageUrl(device.img),
      }));

      return res.json({
        count: devices.count,
        rows: devicesWithUrls,
      });
    } catch (e) {
      console.error("Error in getAll devices:", e);
      return res.status(500).json({ message: e.message });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });

      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }

      const deviceWithUrl = {
        ...device.toJSON(),
        imgUrl: cloudinaryService.getOptimizedImageUrl(device.img),
      };

      return res.json(deviceWithUrl);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }

    // const type = await Type.findOne({ where: { id: device.typeId } });
    // device.dataValues.type = type.name;
    // const brand = await Brand.findOne({ where: { id: device.brandId } });
    // device.dataValues.brand = brand.name;
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;

      const { name, price, brandId, typeId, info: infoJSON } = req.body;
      const info = infoJSON ? JSON.parse(infoJSON) : [];
      const { img } = req.files || {};

      const device = await Device.findOne({ where: { id } });
      if (!device) {
        return next(ApiError.badRequerst("Device not found"));
      }

      let newInfos = [];

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
        device.price = price;
      }
      if (brandId) {
        device.brandId = brandId;
      }
      if (typeId) {
        device.typeId = typeId;
      }
      if (info.length > 0) {
        // await DeviceInfo.destroy({ where: { deviceId: id } });

        // await Promise.all(
        //   info.map(async ({ title = "", description = "" }) => {
        //     if (!title || !description) return null;

        //     return DeviceInfo.create({
        //       title,
        //       description,
        //       deviceId: device.id,
        //     });
        //   })
        // );

        // const infoToCreate = info.filter(async ({ id, title = "", description = "" }) => {

        // LEARN IT

        // const { infoToCreate, infoToUpdate } = ((info) => {
        //   return info.reduce(
        //     (result, item) => {
        //       const { id, title = "", description = "" } = item;
        //       const readyItem = { title, description, deviceId: device.id };
        //       if (id) result.infoToCreate.push(readyItem);
        //       else result.infoToUpdate.push({ id, ...readyItem });
        //       return result;
        //     },
        //     { infoToCreate: [], infoToUpdate: [] }
        //   );
        // })(info);

        const infoReadyToBulkCreate = info.map((i) => {
          const { title = "", description = "" } = i;
          const res = { title, description, deviceId: device.id };
          if (i.id) res.id = i.id;
          return res;
        });

        newInfos = await DeviceInfo.bulkCreate(infoReadyToBulkCreate, {
          updateOnDuplicate: ["title", "description"],
          validate: true,
          returning: true,
        });
      }

      console.log("BEFORE SAVE UPDATED DEVICE", device);

      await device.save();

      newInfos = newInfos.map((info) => info.dataValues);
      device.dataValues.info = newInfos;
      console.log("UPDATED DEVICE", device);

      return res.json(device.dataValues);
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
