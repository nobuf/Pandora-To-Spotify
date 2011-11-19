describe('Insert content_script.js into Pandora.com', function() {
  beforeEach(function() {
  });

  it('should be able to extract six tracks from station.html', function(){
    loadFixtures('station.html');
    var data = Thumbups.get();
    expect(data.length).toEqual(6);
  });

  it('should be able to extract two tracks', function(){
    loadFixtures('likes.html');
    var data = Thumbups.get();
    expect(data.length).toEqual(2);
  });

  it('should be able to extract five tracks', function(){
    loadFixtures('bookmarks.html');
    var data = Thumbups.get();
    expect(JSON.stringify(data)).toBe(JSON.stringify([{"title":"Let's Try This Again","artist":"Sara Gazarek"},{"title":"People Will Say We're In Love","artist":"Sophie Milman"},{"title":"Panda Bear","artist":"Owl City"},{"title":"Don't Dream It's Over","artist":"Sixpence None The Richer"},{"title":"The Secret Garden","artist":"Quincy Jones"}]));
  });
});
