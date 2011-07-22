
(function(){
    var titles = $('span.track_title');
    var data = [];
    for (var i = 0; titles.length > i; i++) {
        var artist = $(titles[i]).closest('tr').find('a[title="Artist details"]').text();
        data.push({title:$(titles[i]).attr('tracktitle'), artist:artist});
    }
    chrome.extension.sendRequest(data);
})();
