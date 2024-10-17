const { userService } = require("../../../modules/user.service");

class HomeController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  async render(req, res, next) {
    try {
      console.log("ishladi");
      
      const users = await this.#userService.getAll();
      console.log(users);
      

      res.render("index.ejs", users);

    } catch (error) {
      next(error);
    }
  }
}

const homeController = new HomeController(userService);

module.exports = { homeController };
