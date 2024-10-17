require("dotenv").config();

const config = {

    port: +process.env.Port,
    jwtKey: process.env.JWT_KEY,

};

module.exports = { config };