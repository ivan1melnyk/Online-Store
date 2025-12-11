const Router = require("express");
const router = new Router();

router.get("/", async (req, res) => {
  res.json({ message: "Hello World!" });
});

module.exports = router;
