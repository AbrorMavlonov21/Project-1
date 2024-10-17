const { Router } = require("express");
const { rhomeController } = require("./rHome.controller");
const { authMiddleware } = require("../../../middlewares/auth.middleware");


const router = Router();

router.get(
  "/",
  authMiddleware.checkToken.bind(authMiddleware),
  authMiddleware.checkUser.bind(authMiddleware),
  rhomeController.render.bind(rhomeController)
);

module.exports = { router };
