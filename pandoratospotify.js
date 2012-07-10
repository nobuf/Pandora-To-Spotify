
var SPOTIFY_METADATA_API_ENDPOINT = 'http://ws.spotify.com/search/1/track.json';
var GOOGLE_GEOCODING_API_ENDPOINT = 'http://maps.googleapis.com/maps/api/geocode/json';
var countryCode = null;
$(document).ready(function(){
    var $queue = $('<div></div>');
    $queue.queue(function(){
        navigator.geolocation.getCurrentPosition(function(position){
            $.get(GOOGLE_GEOCODING_API_ENDPOINT, {sensor:false, latlng:position.coords.latitude+','+position.coords.longitude}, function(locationData){
                if ('status' in locationData && locationData['status'] == 'OK') {
                    $.each(locationData['results'][0]['address_components'], function(index, value){
                        if (value['types'][0] == 'country') {
                            countryCode = value['short_name'];
                            $queue.dequeue();
                        }
                    });
                }
            }).error(function(){
                $queue.dequeue();
            });
        }, function(error){
            $queue.dequeue();
        });
    }).queue(function(){

        chrome.extension.onRequest.addListener(function(data){
            if (data && data.length > 0) {
                $('#error').hide();
                $('#table-wrapper').show();
                $('#done').fadeIn();
            }
            $.each(data, function(index, value){
                window.setTimeout(function(){
                    var query = 'artist:"' + value['artist'] + '"+track:"' + value['title'] + '"';
                    $.get(SPOTIFY_METADATA_API_ENDPOINT, {q:query}, function(trackInfo){
                        var isAvailable = false;
                        if ('tracks' in trackInfo && trackInfo['tracks'].length > 0 && 'href' in trackInfo['tracks'][0]) {
                            var idx = 0;
                            var flag = false;
                            if (countryCode !== null) {
                                for (; idx < trackInfo['tracks'].length; idx++) {
                                    if (trackInfo['tracks'][idx]['album']['availability']['territories']
                                            && (trackInfo['tracks'][idx]['album']['availability']['territories'].indexOf(countryCode) != -1
                                                || trackInfo['tracks'][idx]['album']['availability']['territories'].indexOf('worldwide') != -1)) {
                                        flag = true;
                                        break;
                                    }
                                }
                            } else {
                                flag = true;
                            }
                            if (flag === true) {
                                isAvailable = true;
                                $('textarea').val($('textarea').val()+trackInfo['tracks'][idx]['href']+"\n");
                            }
                        }
                        $('tbody').append('<tr><td>' + value['artist'] + '</td><td>' + value['title'] + '</td><td>' + (function(flag){
                            var okOrNo = flag ? 'ok' : 'no';
                            return '<span class="alert ' + okOrNo + '">' + okOrNo + '</span>';
                        }(isAvailable)) + '</td></tr>');
                        if (index === data.length - 1) {
                            $('textarea').focus().select();
                        }
                    });
                }, 110); // no more than 10 requests per second
            });
        });
        chrome.tabs.executeScript(null, {file: "lib/jquery-1.7.min.js"}, function(){
            chrome.tabs.executeScript(null, {file: "lib/Thumbups.js"}, function(){
                chrome.tabs.executeScript(null, {file: "content_script.js"});
            });
        });
        $queue.dequeue();
    });
});
