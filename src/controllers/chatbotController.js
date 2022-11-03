import {User} from "../data/user";
import mondayController from "../controllers/mondayController";

const bodyParser = require("body-parser");

require("dotenv").config();

const store = {}

const request = require('request');

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
console.log(MY_VERIFY_TOKEN);

let test = (req, res) => {
    return res.send("Hello again");
}

let getWebhook = (req, res) => {
  let VERIFY_TOKEN = MY_VERIFY_TOKEN;
    // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
}

let postWebhook = (req, res) => {
  
  // Parse the request body from the POST
  let body = req.body;
  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    
      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      if(!(store[sender_psid]))
      {
        store[sender_psid] = new User(sender_psid);
      }
      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } 
      else if (webhook_event.postback)
      {
        handlePostback(sender_psid, webhook_event.postback);
      }
      
    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
}

function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature-256"];
  if (!signature) {
    return false;;
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac("sha256", config.appSecret)
      .update(buf)
      .digest("hex");
    if (signatureHash != expectedHash) {
      return false;
    }
  }
  return true;
}

// Handles messages events
function handleMessage(sender_psid, received_message) {

  let response;
  // Checks if the message contains text
  if (received_message.text) {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    let message = "לפני";
    if(store[sender_psid])
    {
      let step = store[sender_psid].get_step()
      if (step > 0){
        store[sender_psid].set_by_step(received_message.text);
      }
      switch (step) {
        case 0:
          message = "איך קוראים לך? (שם מלא)";
          break;
        case 1:
          response = {
            "text": "מה נושא הפנייה?",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"אקדמאי",
                "payload":"academic",
              },{
                "content_type":"text",
                "title":"הנהלתי",
                "payload":"administrative",
              },{
                "content_type":"text",
                "title":"חברתי",
                "payload":"social",
              },{
                "content_type":"text",
                "title":"תקופת מבחנים",
                "payload":"tests",
              },{
                "content_type":"text",
                "title":"אחר",
                "payload":"other",
              }
            ]
          }
          if(store[sender_psid])
          {
            store[sender_psid].step_promotion();
          }
          callSendPostBack(sender_psid, response);
          return;
        case 2:
          message = "מה החוג שלך?";
          break;
        case 3:
          message = "באיזה שנה את/ה בלימודים? (א,ב,ג)";
          break;
        case 4:
          message = "איך אנחנו יכולים לעזור?";
          break;
        case 5:
          message = "מה האימייל שלך?";
          break;
        case 6:
          if (!validateEmail((received_message.text)))
          {
            response = {
              "text": "מייל לא תקין אנא נסה שוב"
            } 
            callSendAPI(sender_psid, response);
            return;
          }
          message = "מה מספר הטלפון שלך?";
          break;
        case 7:
          if(! ((received_message.text).match(/\d/g).length===10))
          {
            response = {
              "text": "מספר טלפון לא תקין אנא נסה שוב"
            } 
            callSendAPI(sender_psid, response);
            return;
          }
          let query = store[sender_psid].get_query(received_message.time);
          mondayController.start_fetch(query, sender_psid);
          message = "תודה, פנייתך נרשמה בהצלחה";
          delete store[sender_psid];
          break;
        default:
          message = "מצטער לא הבנתי אנא התחל מהתחלה";
          delete store[sender_psid];
          break; 
      } 
      response = {
        "text": message
      } 
    }
 }
  if(store[sender_psid])
  {
    store[sender_psid].step_promotion();
  }
  // Send the response message
  callSendAPI(sender_psid, response);       
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;
  // Set the response based on the postback payload
  if (payload === 'start') 
  {
    response = { "text": " שלום הגעתם לבוט אגודת הסטודנטים של תל חי יש לענות על שאלות הבוט. \n מה השם שלך?" }
    if(store[sender_psid])
      store[sender_psid].step_promotion();
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  console.log(response)
  let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}


function callSendPostBack(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "messaging_type": "RESPONSE",
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
  
module.exports = {
    test: test,
    getWebhook: getWebhook,
    postWebhook: postWebhook,
}