const { CustomError } = require("../../lib/customError");
const { authService } = require("./auth.service");
const { userService } = require("../user.service");

class AuthController {
  #authService;
  #userService;
  constructor(authService, userService) {
    this.#authService = authService;
    this.#userService = userService;
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        throw new CustomError(400, "login and password must be required");
      }

      const foundByLogin = await this.#userService.getByLogin(login);

      if (foundByLogin.status === 404) {
        throw new CustomError(400, "password or login is incorrect");
      }

      const userData = await this.#authService.login(
        foundByLogin.data,
        password
      );

      res.cookie("token", userData.data.token);
      res.redirect("/");
    } catch (error) {
      res.render("login.ejs", { message: error.message });
    }
  }

  async register(req, res, next) {
    try {
      const { login, password, districtId, address } = req.body;

      if (!login || !password || !districtId || !address) {
        throw new CustomError(
          400,
          "All details must be provided"
        );
      }

      const foundByLogin = await this.#userService.getByLogin(login);

      if (foundByLogin.data) {
        throw new CustomError(400, "login already exists");
      }

      const hashedPassword = await this.#authService.register(password);

      await this.#userService.create({
        login,
        password: hashedPassword.data,
        districtId,
        address,
      });

      res.redirect("/login");
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController(authService, userService);

module.exports = { authController };
