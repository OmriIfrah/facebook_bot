

const api_key = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjExNTM5MzU1MSwidWlkIjoyMjM5MDcwMiwiaWFkIjoiMjAyMS0wNi0yOVQxNDo1MjoxNy4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6OTExMDA5NiwicmduIjoidXNlMSJ9.omzcoKrTHw63_L1ctkCQla6RuNeZWaR7WEBU8jP1k58";

let f = fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : api_key
   },
   body: JSON.stringify({
     'query' : '{ boards (limit:1) {3316014705} }'
   })
  });

export const f= f;
