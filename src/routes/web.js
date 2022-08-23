import express from "express";
import chatbotController from "../controllers/chatbotController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", chatbotController.test);
    router.get("/webhook", chatbotController.getWebhook);
    //router.get("/handm#webhook", chatbotController.getWebhook);
    router.post("/webhook", chatbotController.postWebhook);
    return app.use("/", router);
};

// Verify that the callback came from Facebook.
function verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature"];
  
    if (!signature) {
      console.warn(`Couldn't find "x-hub-signature" in headers.`);
    } else {
      var elements = signature.split("=");
      var signatureHash = elements[1];
      var expectedHash = crypto
        .createHmac("sha1", config.appSecret)
        .update(buf)
        .digest("hex");
      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }

module.exports = initWebRoutes;