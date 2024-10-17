const { Repository } = require("../../lib/repository");
const { ResData } = require("../../lib/resData");
const { join } = require("node:path")
const {idGeneration} = require("../../lib/idGeneration");

class DistrictService {
    #repository;
    constructor(repository) {
        this.#repository= repository
        
    }

     async getAll() {
    const data = await this.#repository.read();

    const resData = new ResData(200, "success", data);

    return resData;
  }

    async postDistrict(dto){ 
        let districtData = await this.#repository.read();
        const newId = idGeneration(districtData);
        dto.id = newId

        districtData.push(dto);

        await this.#repository.write(districtData);

        const resData = new ResData(201, "Created", dto);
        return resData;

    }

        async deleteDistrict(id){
        let allData = await this.#repository.read();

        const findID = allData.findIndex((district) => {
        return district.id === Number(id);
    });

        
        if (findID === -1) {
            throw new CustomError(404, "Country not found");
        }
        const deletedData =  allData.splice(findID, 1);
        await this.#repository.write(allData);
        return deletedData;


    }
}

const districtDBUrl = join(__dirname, "../../database", "districts.json");

const repository = new Repository(districtDBUrl);

const districtService = new DistrictService(repository);

module.exports = { districtService };

