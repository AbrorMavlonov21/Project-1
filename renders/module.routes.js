const { Router } = require("express");
const authRoutes = require("../modules/Auth/auth.routes");
const stateRoutes = require("../modules/state/state.routes");
const regionRoutes = require("../modules/region/region.routes");
const distictRoutes = require("../modules/district/district.routes");


const router = Router();

router.use("/auth", authRoutes.router);
router.use("/state", stateRoutes.router);
router.use("/region", regionRoutes.router)
router.use("/district", distictRoutes.router)


module.exports = { router };
