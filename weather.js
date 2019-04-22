const http = require("http");
const https = require("https");
const querystring = require("querystring");
const api = require("./api.json");

// Print out temp details
function printWeather(weather) {
  const message = `Current temperature in ${weather.name} is ${
    weather.main.temp
  }F`;
  console.log(message);
}
// Print out error message

function printError(error) {
  console.error(error.message);
}

function get(query) {
  //take out underscores for readability
  const readableQuery = query.replace("_", " ");
  try {
    // const request =
    // https.get(`https://`)
    //const url = `https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`;

    const parameters = {
      APPID: api.key,
      units: "imperial"
    };

    const zipCode = parseInt(query);
    if (!isNaN(zipCode)) {
      parameters.zip = zipCode + ",us";
    } else {
      parameters.q = query + ",us";
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(
      parameters
    )}`;
    console.log(url);

    const request = https.get(url, response => {
      if (response.statusCode === 200) {
        let body = "";
        // Read the data
        response.on("data", chunk => {
          body += chunk;
        });
        response.on("end", () => {
          console.log(body);
          try {
            //Parse data
            const weather = JSON.parse(body);
            //Print the data
            printWeather(weather);
          } catch (error) {
            //parse error
            printError(error);
          }
        });
      } else {
        //status error code
        const statusErrorCode = new Error(
          `There was an error getting the message for "${query}". (${
            http.STATUS_CODES[response.statusCode]
          })`
        );
        printError(statusErrorCode);
      }
    });
  } catch (error) {
    print(error);
  }
}

module.exports.get = get;

//TODO: Handle any errors
