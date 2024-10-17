const { districtService } = require("../../../modules/district/district.service");

class DHomeController {
  #districtService;
  constructor(districtService) {
    this.#districtService = districtService;
  }

  async render(req, res, next) {
    try {
      const districts = await this.#districtService.getAll();

      res.render("district.ejs", districts);
    } catch (error) {
      next(error);
    }
  }
}

const dhomeController = new DHomeController(districtService);

module.exports = { dhomeController };
