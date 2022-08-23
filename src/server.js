require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"

let app = express();

//config view engine
viewEngine(app);

//config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({express: true}));
app.use((req,res,next) => {
    console.log(req.method + " " + req.url);
    if(req.body)
    {
        console.log(JSON.stringify(req.body,null,2))
    }
    next();
})

//init web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log("App is running at port : "+ port);
});