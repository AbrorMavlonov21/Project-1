const { CustomError } = require("../../lib/customError");
const { stateService } = require("./state.service");

class StateController {
  #stateService;
  constructor(stateService) {
    this.#stateService = stateService;
  }

      async createStates(req, res, next){

        try {

            const{ name } = req.body;
            if (!name) {
                throw new CustomError(400, "all details are not provided ! ");
            }            

            const dto = {
                name
            };
            const resData = await this.#stateService.postState(dto);
            // res.status(resData.status).json(resData);
            
            res.redirect("/state");

        } catch (error) {
            next(error);
            
        }
    }

    async deleteStates(req, res, next){
        try {
            const { id } = req.body;

            await this.#stateService.deleteState(id);
            res.redirect("/state");

        } catch (error) {
            next(error);
            
        }
    }


}

const stateController = new StateController(stateService);

module.exports = { stateController };
