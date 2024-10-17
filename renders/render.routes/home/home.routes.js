const { Router } = require("express");
const { homeController } = require("./home.controller");
const { authMiddleware } = require("../../../middlewares/auth.middleware");

const router = Router();

router.get(
  "/",
  authMiddleware.checkToken.bind(authMiddleware),
  authMiddleware.checkUser.bind(authMiddleware),
  homeController.render.bind(homeController)
);

module.exports = { router };
