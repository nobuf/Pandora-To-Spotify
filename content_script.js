(function(){
    var titles = $('table#tbl_thumbs_up,table#tbl_track_bookmarks').find('span.track_title');
    var data = [];
    for (var i = 0; titles.length > i; i++) {
        var artist = $(titles[i]).closest('tr').find('a[title="Artist details"]').text().split("(")[0];
        var track = {title:$(titles[i]).attr('tracktitle'), artist:artist};
        if(!data.some(function(element, index, array){
            return(element['artist'] == track['artist'] && element['title'] == track['title']); }))
            data.push(track);
    }
    chrome.extension.sendRequest(data);
})();
