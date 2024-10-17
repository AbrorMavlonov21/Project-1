const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { join } = require("node:path");
const { config } = require("./config/index");
const { CustomError } = require("./lib/customError");
const { ResData } = require("./lib/resData");
const { error } = require("node:console");
const renderRoutes  = require("./renders/render.routes/render.routes");
const { router } = require("./renders/module.routes");



const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "./views"));

app.use("/api", router);
app.use("/", renderRoutes.router);

app.use((req, res, next) =>{
    try {
        const url = req.url;
        const method =req.method;
        throw new CustomError(404, `this ${url}  method ${method} is not found`)


    } catch (error) {
        next(error);
        
    }
});

app.use((error, req, res, next) =>{

    const status = error.status || 500;
    const message = error.message;
    const resData = new ResData(status, message);

    res.status(status).json(resData);

})


app.listen( config.port, () =>{
    console.log("http://localhost:" + config.port);
});