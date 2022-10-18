import express from "express";
import chatbotController from "../controllers/chatbotController";
import mondayController from "../controllers/mondayController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", chatbotController.test);
    router.get("/webhook", chatbotController.getWebhook);
    router.post("/webhook", chatbotController.postWebhook);
    router.post("/monday", mondayController.challange);
    return app.use("/", router);
};


module.exports = initWebRoutes;