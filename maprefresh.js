var playerMarkers = null,
    reg = /(\d{4})(\d{2})(\d{2}) (\d{2}):(\d{2}):(\d{2})/;

function deletePlayerMarkers() {
  if (playerMarkers) {
    for (i in playerMarkers) {
      playerMarkers[i].setMap(null);
    }
    playerMarkers = null;
  }
}

setInterval(loadPlayerMarkers, 1000 * 15);

function loadPlayerMarkers() {
    $.getJSON('players.json', function(data) {
        deletePlayerMarkers();
        playerMarkers = [];
        for (i in data) {
            var item = data[i],
		m = reg.exec(item.timestamp),
		ts = new Date(m[1],m[2]-1,m[3],m[4],m[5],m[6]),
		d = new Date(),
		diff = d.getTime() - ts.getTime();
	    if( diff < 10 * 1000*60 )
	    {
	            var converted = fromWorldToLatLng(item.x, item.y, item.z);
	            playerMarkers.push(
	                new google.maps.Marker({
	                    position: converted,
	                    map: map,
	                    title: item.msg,
	                    icon: 'User.png'
	                })
	            );
	    }
        }
    });
}  
