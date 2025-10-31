const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequerst("Uncorrect email or password"));
    }
    const candidate = await User.findOne({ where: { email } });

    if (candidate === null) {
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } else {
      return next(ApiError.badRequerst("A user with the name exist yet"));
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      return next(ApiError.internal("The user with this email is not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequerst("The false password"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    res.json({ message: "ALL RIGHT!" });
  }
  async remove(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const id = req.user.id;
      const user = req.user;
      await User.destroy({ where: { id } });
      res.json({ delete: user });
    } catch (e) {
      next(ApiError.badRequerst("Problem with delete"));
    }
  }
}

module.exports = new UserController();
