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
        playerMarkers = [],
	plist = [];

	if (data.length == 0)
        {
		$('#plist').html('[No players online]');
		return;
	}

        for (i in data) {
            var item = data[i],
		m = reg.exec(item.timestamp),
		ts = new Date(m[1],m[2]-1,m[3],m[4],m[5],m[6]),
		d = new Date(),
		diff = d.getTime() - ts.getTime(),
	        converted = fromWorldToLatLng(item.x, item.y, item.z);
	    if( diff < 10 * 1000*60 )
	    {
	            playerMarkers.push(
	                new google.maps.Marker({
	                    position: converted,
	                    map: map,
	                    title: item.msg,
	                    icon: 'User.png'
	                })
	            );
		    plist.push("<a href='#' onClick='gotoPlayer(" + i + ")'>" + item.msg + "</a>");
	    } 
	    else
            {
	            playerMarkers.push(
	                new google.maps.Marker({
	                    position: converted,
	                    map: map,
	                    title: item.msg + " - Idle since " + ts.toString(),
	                    icon: 'User.png'
	                })
	            );
		    plist.push("<a href='#' onClick='gotoPlayer(" + i + ")' class='idle'>" + item.msg + "</a>");
	    }
	    $('#plist').html(plist.join("<br/>"));
        }
    });
}  

function gotoPlayer(index)
{
	map.setCenter(playerMarkers[index].position);
	map.setZoom(6);
}
