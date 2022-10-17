import AbortController from "abort-controller"

const api_key = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjExNTM5MzU1MSwidWlkIjoyMjM5MDcwMiwiaWFkIjoiMjAyMS0wNi0yOVQxNDo1MjoxNy4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6OTExMDA5NiwicmduIjoidXNlMSJ9.omzcoKrTHw63_L1ctkCQla6RuNeZWaR7WEBU8jP1k58";

const fetch = require('node-fetch');
const request = require('request');

let controller = new AbortController();
let signal = controller.signal;

  // Query 4: Create a new item and populate column values
function start_fetch(vars2, sender_psid){
  if (sender_psid== 111215241704112 || sender_psid == "111215241704112")
  {
    return;
  }
  let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:3316014705, item_name:$myItemName, column_values:$columnVals) { id } }';
  let vars = vars2;
  fetch ("https://api.monday.com/v2", {
      method: 'post',
      signal: controller.signal,
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : api_key
      },
      body: JSON.stringify({
          'query' : query5,
          'variables' : JSON.stringify(vars)
      })
  })
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res, null, 2)))
  }

module.exports = {
  start_fetch: start_fetch,
}




/*function start_fetch(vars) {
  // Construct the message body
  let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:3316014705, item_name:$myItemName, column_values:$columnVals) { id } }';
  let request_body = JSON.stringify({
    'query' : query5,
    'variables' : JSON.stringify(vars)
})
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://api.monday.com/v2",
    "method": "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : api_key,
  },
    "body": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}*/