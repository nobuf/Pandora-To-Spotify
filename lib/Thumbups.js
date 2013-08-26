

var Thumbups = {
  get: function(){
	return revealAllThumbedUpTracks();

      function revealAllThumbedUpTracks(){
          var $moreThumbUpsBtn = getElementByXpath("//ul[@class='thumb_up_list']//div[@class='show_more' and not(contains(@style,'display: none'))]");
          if($moreThumbUpsBtn != null){
              console.log($moreThumbUpsBtn);
              $moreThumbUpsBtn.click();
              window.setTimeout(revealAllThumbedUpTracks,1000);
          }
          else{
              return getData();
          }
      }

      function getElementByXpath(path) {
          return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      }

     function getData()
     {
         console.log("getting tracks");
         var data = [];
         //  Extract from "Thumbed-up Tracks" on each station
         var thumbedupTracks = $('ul.thumb_up_list,ul.song_list').find('li');
         for (var i = 0; thumbedupTracks.length > i; i++) {
             var title = $(thumbedupTracks[i]).find('h3 a:first').text();
             var artist = $(thumbedupTracks[i]).data('artist');
             var track = makeTrack(title, artist);
             push(track);
         }
         //  Extract from Bookmarks/Likes
         var bookmarkTracks = $('div[trackbookmark],div[id^=tracklike]');
         for (var i = 0; bookmarkTracks.length > i; i++) {
             var title = $(bookmarkTracks[i]).find('h3 a').text();
             var artist = normalizeArtist($(bookmarkTracks[i]).find('p a:first').text());
             var track = makeTrack(title, artist);
             push(track);
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
  }      }
};
