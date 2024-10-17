const { Repository } = require("../../lib/repository");
const { ResData } = require("../../lib/resData");
const { join } = require("node:path");
const {idGeneration} = require("../../lib/idGeneration");
const { CustomError } =require("../../lib/customError");
const { log } = require("node:console");


class StateService {
    #repository;
    constructor(repository) {
        this.#repository= repository
        
    }

    async getAll() {
    const data = await this.#repository.read();

    const resData = new ResData(200, "success", data);

    return resData;
  }

    async postState(dto){
        let stateData = await this.#repository.read();
        const newId = idGeneration(stateData);
        dto.id = newId

        stateData.push(dto);

        await this.#repository.write(stateData);

        const resData = new ResData(201, "Created", dto);
        return resData;

    }

    async deleteState(id){
        let allData = await this.#repository.read();

        console.log("Passed ID:", id);
        

        const findID = allData.findIndex((state) => {
        return state.id === Number(id);
    });

        
        if (findID === -1) {
            throw new CustomError(404, "Country not found");
        }
        const deletedData =  allData.splice(findID, 1);
        await this.#repository.write(allData);
        return deletedData;


    }
}

const stateDBUrl = join(__dirname, "../../database", "states.json");

const repository = new Repository(stateDBUrl);

const stateService = new StateService(repository);

module.exports = { stateService };

