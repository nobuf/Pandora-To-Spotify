var Thumbups = {
  get: function(){
    var data = [];
    //  Extract from "Thumbed-up Tracks" on each station
    var thumbedupTracks = $('ul.thumb_up_list,ul.song_list').find('li');
    for (var i = 0; thumbedupTracks.length > i; i++) {
      var artist = normalizeArtist($(thumbedupTracks[i]).data('artist'));
      var track = makeTrack($(thumbedupTracks[i]).find('h3 a:first').text(), artist);
      push(track);
    }
    //  Extract from Bookmarks/Likes
    var bookmarkTracks = $('div[trackbookmark],div[id^=tracklike]');
    for (var i = 0; bookmarkTracks.length > i; i++) {
      var title = $(bookmarkTracks[i]).find('h3 a').text();
      var artist = normalizeArtist($(bookmarkTracks[i]).find('p a:first').text());
      push(makeTrack(title, artist));
    }
    return data;

    function push(newElement)
    {
      var inArray = data.some(function(element, index, array){
        return element['artist'] == newElement['artist'] && element['title'] == newElement['title'];
      });
      if (!inArray) {
        data.push(newElement);
      }
    }
    function normalizeArtist(artist)
    {
      return artist.split('(')[0];
    }
    function makeTrack(title, artist)
    {
      return {title: title, artist: artist};
    }
  }
};
