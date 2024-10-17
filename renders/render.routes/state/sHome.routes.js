const { Router } = require("express");
const { shomeController } = require("./sHome.controller");
const { authMiddleware } = require("../../../middlewares/auth.middleware");

const router = Router();

router.get("/",
    authMiddleware.checkToken.bind(authMiddleware),
    authMiddleware.checkUser.bind(authMiddleware),
    shomeController.render.bind(shomeController));

module.exports = { router };
