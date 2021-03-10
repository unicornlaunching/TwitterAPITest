document.addEventListener("DOMContentLoaded", () => {
  // Calls whats in here
  let button = document.getElementById("submit")

  button.addEventListener("click", (event) => {
    console.log(event)
    // From here, we will call the Twitter api q=accountname count=numberoftweets
    let response = httpGet('https://api.twitter.com/1.1/search/tweets.json?q=attractfunding&count=100')
    handleResponse(response)
  })
})

function handleResponse(response) {
  var statuses = response.statuses
  var textCollection = []
  statuses.forEach((stat) => {
    // Extract text from status
    let text = stat.text
    textCollection.push(text)
  });
  renderText(textCollection)
}

function renderText(textCollection) {
  // Expects a list of strings/text
  textCollection.forEach((text) => {
    let paragraph = document.createElement("p")
    let node = document.createTextNode(text)
    paragraph.appendChild(node)
  
    let tweetDiv = document.getElementById('tweetContainer')
    tweetDiv.appendChild(paragraph)
  })
}

/*
        ----------
url -> | httpGet | --> responseFromServer
        ----------
*/

function httpGet(urlParameter) {
  var token = "HEYYOUYESYOUINSERTBEARERTOKENFROMTWITTERDEVELOPERCONSOLE"
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", urlParameter, false); // false for a synchronous rquest
  xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token)
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}
