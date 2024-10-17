const { CustomError } = require("../../lib/customError");
const { regionService } = require("./region.service");

class RegionController {
  #regionService;
  constructor(regionService) {
    this.#regionService = regionService;
  }   
      async createRegions(req, res, next){

        try {

            const{ name, stateId  } = req.body;
            if (!name || !stateId) {
                throw new CustomError(400, "all details are not provided ! ");
            }            

            const dto = { name, stateId };
            const resData = await this.#regionService.postRegion(dto);
            res.redirect("/region");

        } catch (error) {
            next(error);
            
        }
    }
    async deleteRegions(req, res, next){
        try {
            const {id} = req.body;
            await this.#regionService.deleteRegion(id);
            res.redirect("/region");
        } catch (error) {
            next(error)
            
        }
    }


}

const regionController = new RegionController(regionService);

module.exports = { regionController };
