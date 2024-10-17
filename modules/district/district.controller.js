const { CustomError } = require("../../lib/customError");
const { districtService } = require("./district.service");

class DistrictController {
  #districtService;
  constructor(districtService) {
    this.#districtService = districtService;
  } 

      async createDistricts(req, res, next){

        try { 

            const{ name, regionId  } = req.body;
            if (!name || !regionId) {
                throw new CustomError(400, "all details are not provided ! ");
            }            

            const dto = { name, regionId };
            const resData = await this.#districtService.postDistrict(dto);
            res.redirect("/district");

        } catch (error) {
            next(error);
            
        }
    }

    async deleteDistricts(req, res, next){
        try {

            const { id } = req.body;
            await this.#districtService.deleteDistrict(id);
            res.redirect("/district");
            
        } catch (error) {
            next(error)
            
        }
    }


}

const districtController = new DistrictController(districtService);

module.exports = { districtController };
