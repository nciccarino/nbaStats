$(document).ready(function() { 

    function showDetails(player) {
      console.log(player)
      var thePlayer = player.getAttribute("data-person");
      var playerfirst = player.getAttribute("data-namefirst")
      var playerlast = player.getAttribute("data-namelast")
      var playerJersey = player.getAttribute("data-jersey")
      var playerInfo = "#" + playerJersey + " - " + playerfirst + " " + playerlast
      document.getElementById('modalHeader').innerHTML = playerInfo
      $.ajax({
        method: 'GET',
        url: '/nba/stats/' + thePlayer
      }).done(function(data) {
        console.log(data) 
      })
    }

	// var playerArr1 = [203991, 201960, 1713, 203487];
	// var playerArr2 = [1627936, 201956, 1626161, 1628463]; 

	// var arraysPlayers = {
	// 	arrlist: playerArr1,
	// 	arrvs: playerArr2
	// }

	// function playerCompare() {
	// 	$.ajax({
	// 		method:'GET', 
	//     url: "/nba/playerCompare/" + playerArr1 + "/" + playerArr2 
	// 	}).then(function(data) {
	// 		console.log('hit')
	// 		console.log(data)
	// 	})
	// }

	// getPlayer()

	// playerCompare()

}); //end doc