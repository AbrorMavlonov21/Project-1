const { Router } = require("express");
const { districtController } = require("./district.controller");

const router = Router();

router.post("/createDistricts", districtController.createDistricts.bind(districtController));
router.post("/deleteDistricts", districtController.deleteDistricts.bind(districtController));


module.exports = { router };
