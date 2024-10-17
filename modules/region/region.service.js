const { Repository } = require("../../lib/repository");
const { ResData } = require("../../lib/resData");
const { join } = require("node:path");
const {idGeneration} = require("../../lib/idGeneration");


class RegionService {
    #repository;
    constructor(repository) {
        this.#repository= repository
        
    }

     async getAll() {
    const data = await this.#repository.read();

    const resData = new ResData(200, "success", data);

    return resData;
  }

    async postRegion(dto){
        let regionData = await this.#repository.read();
        const newId = idGeneration(regionData);
        dto.id = newId

        regionData.push(dto);

        await this.#repository.write(regionData);

        const resData = new ResData(201, "Created", dto);
        return resData;

    }

        async deleteRegion(id){
        let allData = await this.#repository.read();
        
        const findID = allData.findIndex((region) => {
        return region.id === Number(id);
    });

        
        if (findID === -1) {
            throw new CustomError(404, "Region not found");
        }
        const deletedData =  allData.splice(findID, 1);
        await this.#repository.write(allData);
        return deletedData;


    }
}

const regionDBUrl = join(__dirname, "../../database", "regions.json");

const repository = new Repository(regionDBUrl);

const regionService = new RegionService(repository);

module.exports = { regionService };

