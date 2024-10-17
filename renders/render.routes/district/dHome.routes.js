const { Router } = require("express");
const { dhomeController } = require("./dHome.controller");
const { authMiddleware } = require("../../../middlewares/auth.middleware");

const router = Router();

router.get(
  "/",
  authMiddleware.checkToken.bind(authMiddleware),
  authMiddleware.checkUser.bind(authMiddleware),
  dhomeController.render.bind(dhomeController)
);

module.exports = { router };
