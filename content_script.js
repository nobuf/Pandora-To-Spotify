(function(){
  Thumbups.get(function(tracks){
    chrome.extension.sendRequest(tracks);
  });
})();
