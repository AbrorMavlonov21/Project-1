const { regionService } = require("../../../modules/region/region.service");

class RHomeController {
  #regionService;
  constructor(regionService) {
    this.#regionService = regionService;
  }

  async render(req, res, next) {
    try {
      const regions = await this.#regionService.getAll();

      res.render("region.ejs", regions);
    } catch (error) {
      next(error);
    }
  }
}

const rhomeController = new RHomeController(regionService);

module.exports = { rhomeController };
