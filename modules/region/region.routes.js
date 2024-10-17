const { Router } = require("express");
const { regionController } = require("./region.controller");

const router = Router();

router.post("/createRegions", regionController.createRegions.bind(regionController));
router.post("/deleteRegions", regionController.deleteRegions.bind(regionController));

module.exports = { router };
