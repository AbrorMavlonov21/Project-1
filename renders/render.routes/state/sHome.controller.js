const { stateService } = require("../../../modules/state/state.service");

class SHomeController {
  #stateService;
  constructor(stateService) {
    this.#stateService = stateService;
  }

  async render(req, res, next) {
    try {
      const states = await this.#stateService.getAll();

      res.render("state.ejs", states);
    } catch (error) {
      next(error);
    }
  }
}

const shomeController = new SHomeController(stateService);

module.exports = { shomeController };
