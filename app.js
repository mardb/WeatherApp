const weather = require('./weather');
//Join multiple values passed as arguments and replace all spaces with underscores
const query = process.argv.slice(2).join(' ');


//query: 90201
//query: Cleveland and OH
//query: London_England
weather.get(query);