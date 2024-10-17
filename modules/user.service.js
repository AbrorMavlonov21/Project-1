const { CustomError } = require("../lib/customError");
const { ResData } = require("../lib/resData");
const { Repository } = require("../lib/repository");
const { resolve } = require("path");
const {generationId} = require("../lib/generationId")




class UserService {
    #repository;
    constructor(repository) {

        this.#repository = repository;
        
    }

    async getOneById(id){
        const users = await this.#repository.read();

        const findUser = users.find((user) => user.id === id);

        if (!findUser) {
            throw CustomError(404, "user not found ")
        }

        const resData = new ResData(200, "success", findUser);

    return resData;
    }

    async getAll(){
        const data = await this.#repository.read();

        const resData = new ResData(200, "Success", data)

        return resData;
    }

    async getByLogin(login) {
    const data = await this.#repository.read();

    const foundUser = data.find((user) => user.login === login);

    const resData = new ResData(200, "success", foundUser);

    if (!foundUser) {
      resData.status = 404;
      resData.message = "user not found";
    }

    return resData;
  }

    async create(body) {
    const newId = generationId();

    body.id = newId;

    const data = await this.#repository.read();

    data.push(body);

    await this.#repository.write(data);

    const resData = new ResData(201, "created", body);

    return resData;
  }


}

const userDbUrl = resolve("database", "users.json");

const repository = new Repository(userDbUrl);

const userService = new UserService(repository);

module.exports = { userService };
