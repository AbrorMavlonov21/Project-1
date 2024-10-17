const { Router } = require("express");
const { stateController } = require("./state.controller");

const router = Router();

router.post("/createStates", stateController.createStates.bind(stateController));
router.post("/deleteStates", stateController.deleteStates.bind(stateController));

module.exports = { router };
