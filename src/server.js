require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"

let app = express();
const mongoose = require('mongoose')

const uri = 'mongodb+srv://omri:Omri123456@chatbotcluster.chsxgah.mongodb.net/?retryWrites=true&w=majority'

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

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();