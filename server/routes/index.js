const Router = require("express");
const router = new Router();
const helloWorldRouter = require("./helloWorld");
const userRouter = require("./userRouter");
const deviceRouter = require("./deviceRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");

router.use("/", helloWorldRouter);
router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

module.exports = router;
