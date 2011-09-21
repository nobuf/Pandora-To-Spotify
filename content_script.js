(function(){
    var titles = $('ul.thumb_up_list,ul.song_list').find('li');
    var data = [];
    for (var i = 0; titles.length > i; i++) {
        var artist = $(titles[i]).data('artist').split("(")[0];
        var track = {title:$(titles[i]).find('h3 a').text(), artist:artist};
        if(!data.some(function(element, index, array){
            return(element['artist'] == track['artist'] && element['title'] == track['title']); }))
            data.push(track);
    }
    chrome.extension.sendRequest(data);
})();
