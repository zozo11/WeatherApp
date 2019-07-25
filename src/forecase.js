const request = require('request');

const forecase = (lag, long, callback) => {
    const url = 'https://api.darksky.net/forecast/3d9eba2a07db30ffa854da0973bced80/' + encodeURI(lag) + ',' + encodeURI(long);
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to server', undefined);
        }else if(body.latitude.length === 0 || body.longitude.length === 0){
            callback('Unable to catch the longitude or latitude');
        }else{
            const timezone = body.timezone;
            const precipIntensity = body.currently.precipIntensity;
            const precipType = body.daily.data[0].precipType;
            const summary = body.daily.data[0].summary;
            const temperature = body.currently.temperature;
            callback(undefined, timezone + ' area have the ' + precipIntensity + '% chance ' + precipType + ' and the temperature is ' + temperature + ' '+ summary);
        }
    });
}

module.exports = forecase;