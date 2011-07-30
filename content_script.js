(function(){
    var titles = $('table#tbl_thumbs_up').find('span.track_title');
    var data = [];
    for (var i = 0; titles.length > i; i++) {
        var artist = $(titles[i]).closest('tr').find('a[title="Artist details"]').text().split("(")[0];
        data.push({title:$(titles[i]).attr('tracktitle'), artist:artist});
    }
    chrome.extension.sendRequest(data);
})();
