

const api_key = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjExNTM5MzU1MSwidWlkIjoyMjM5MDcwMiwiaWFkIjoiMjAyMS0wNi0yOVQxNDo1MjoxNy4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6OTExMDA5NiwicmduIjoidXNlMSJ9.omzcoKrTHw63_L1ctkCQla6RuNeZWaR7WEBU8jP1k58";

const fetch = require('node-fetch');
// Query 1: return a list of boards

/*let query = '{ boards (limit:5) {3316014705} }';

fetch ("https://api.monday.com/v2", {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : api_key
    },
    body: JSON.stringify({
        'query' : query
    })
})
  .then(res => res.json())
  .then(res => console.log(JSON.stringify(res, null, 2)));*/

//function start_fetch(){
  /*let query3 = 'mutation{ create_item (board_id:3316014705, item_name:\"WHAT IS UP MY FRIENDS!\") { id } }';

  fetch ("https://api.monday.com/v2", {
      method: 'post',
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : api_key
      },
      body: JSON.stringify({
          'query' : query3
      })
  })
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res, null, 2)));
}*/


  // Query 4: Create a new item and populate column values
function start_fetch(vars2){
  let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:3316014705, item_name:$myItemName, column_values:$columnVals) { id } }';
  let sender = "karin"
  let vars = vars2;
  fetch ("https://api.monday.com/v2", {
      method: 'post',
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
    .then(res => console.log(JSON.stringify(res, null, 2)));
}
module.exports = {
  start_fetch: start_fetch,
}