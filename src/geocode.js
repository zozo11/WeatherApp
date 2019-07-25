const request = require('request');

const geoadr = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) +'.json?access_token=pk.eyJ1Ijoiem9lMTEiLCJhIjoiY2p5Y2d6YWtpMGlubTNnczVxbmQ4am90bSJ9.otZLu1e70zMo8BErcA_XKw&limit=1';
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect server', undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find the location, try another one');
        }else{
            const latitude = response.body.features[0].center[1];
            const longtitude = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;
            callback(undefined, {latitude,longtitude,location});
        }
    })
}

module.exports = geoadr