$(document).ready(function() { 

	$(document.body).on("click", '.actionButton', showDetails);

	function getTeams() {
	  $.ajax({
	  	method:'GET', 
	    url: "/nba/teams/"
	  }).done(function(data) {
	  	var teams = data.teams.config

	  	var teamLogo = {
	  		ATL: '../images/logos/hawks.png',
	  		BKN: '../images/logos/nets.png',
	  		BOS: '../images/logos/celtics.png',
	  		CHA: '../images/logos/hornets.png',
	  		CHI: '../images/logos/bulls.png', 
	  		CLE: '../images/logos/cavs.png',
	  		DAL: '../images/logos/mavs.png',
	  		DEN: '../images/logos/nuggets.png',
	  		DET: '../images/logos/pistons.png',
	  		GSW: '../images/logos/warriors.png',
	  		HOU: '../images/logos/rockets.png',
	  		IND: '../images/logos/pacers.png',
	  		LAC: '../images/logos/clippers.png',
	  		LAL: '../images/logos/lakers.png',
	  		MEM: '../images/logos/grizzlies.png',
	  		MIA: '../images/logos/heat.png',
	  		MIL: '../images/logos/bucks.png',
	  		MIN: '../images/logos/timberwolves.png',
	  		NOP: '../images/logos/pelicans.png',
	  		NYK: '../images/logos/knicks.png',
	  		OKC: '../images/logos/thunder.png',
	  		ORL: '../images/logos/magic.png',
	  		PHI: '../images/logos/sixers.png',
	  		PHX: '../images/logos/suns.png',
	  		POR: '../images/logos/blazers.png', 
	  		SAC: '../images/logos/kings.png',
	  		SAS: '../images/logos/spurs.png',
	  		TOR: '../images/logos/raptors.png', 
	  		UTA: '../images/logos/jazz.png',
	  		WAS: '../images/logos/wizards.png'
	  	}

	  	for(var i = 0; i < teams.length; i++) {

	  		var tricode = teams[i].tricode

	  		var teamWrapper = $("<li>")
	  		var teamHeader = $("<div>").addClass("collapsible-header teamHeader " + teams[i].teamId);
	  		var teamHeaderTri = $("<img src=" + teamLogo[tricode] + " class='tri'>")
	  		var teamHeaderTitle = $("<div class='tts'>" + teams[i].ttsName + "</div>")
				var teamBody = $("<div id='" + teams[i].teamId + "' style='background-color: " + teams[i].primaryColor +"'>").addClass("collapsible-body row teamSection")

	  		if(teams[i].teamId !== 000000 && teams[i].ttsName) {
	  			teamHeader.append(teamHeaderTri);
	  			teamHeader.append(teamHeaderTitle);
	  			teamWrapper.append(teamHeader);
	  			teamWrapper.append(teamBody);
	  			$(".teamsHolder").append(teamWrapper);
	  		}
	  	}
	  	getPlayers()
	  })
	};

	function showModal() {
		alert("modal")
	}

	function getPlayers() {
	  $.ajax({
	  	method:'GET', 
	    url: "/nba/players/"
	  }).done(function(data) {
	  	var players = data.league.standard
	  	//console.log(players)
	  	for(var i = 0; i < players.length; i++) {
	  		var card = $("<div id='" + players[i].personId + "'>").addClass("playerCards")
	  		var col = $("<div>").addClass("col s6 m4")
	  		var cardClass = $("<div>").addClass("card blue-grey darken-1") 

	  		var cardContent = $("<div>").addClass("card-content white-text")

	  		var	cardTitle = $("<span>#" + players[i].jersey + " - " + players[i].firstName + " " + players[i].lastName + "</span>").addClass("card-title playerName") 
	  		var playerTable = $("<table>").addClass("playerTable")

	  		var playerSection = $("<tr>")
	  		var playerSectionTitle = $("<th colspan=2>Player Status</th>").addClass("tableSection")

	  		playerSection.append(playerSectionTitle)
	  		playerTable.append(playerSection)

	  		var positionSection = $("<tr>")
	  		var posTitle = $("<th>Position</th>")
	  		var position = $("<td>" + players[i].pos + "<td>")

	  		positionSection.append(posTitle)
	  		positionSection.append(position)
	  		playerTable.append(positionSection)

	  		var statusSection = $("<tr>")
	  		var statusTitle = $("<th>Status</th>")
	  		var status;

	  		if(players[i].isActive == true) {
	  			status = $("<td><i class='material-icons'>flash_on</i> Player Active</td>").addClass("playerActive")
	  		} else {
	  			status = $("<td><i class='material-icons'>flag</i> Player Inactive</td>").addClass("playerActive")
	  		}

	  		statusSection.append(statusTitle)
	  		statusSection.append(status)
	  		playerTable.append(statusSection)

	  		var bioSection = $("<tr>")
	  		var bioSectionTitle = $("<th colspan=2>Bio</th>").addClass("tableSection")

	  		bioSection.append(bioSectionTitle)
	  		playerTable.append(bioSection)

	  		var countrySection = $("<tr>")
	  		var countryTitle = $("<th>Country</th>")
	  		var country = $("<td>" + players[i].country + "<td>")

	  		countrySection.append(countryTitle)
	  		countrySection.append(country)
	  		playerTable.append(countrySection)

	  		var collegeSection = $("<tr>")
	  		var collegeTitle = $("<th>College</th>")
	  		var college = $("<td>" + players[i].collegeName + "<td>")

	  		collegeSection.append(collegeTitle)
	  		collegeSection.append(college)
	  		playerTable.append(collegeSection)

	  		var momentDOB = moment(players[i].dateOfBirthUTC).format('ll');  

	  		var dobSection = $("<tr>")
	  		var dobTitle = $("<th>Date of Birth</th>")
	  		var dob = $("<td>" + momentDOB + "<td>")

	  		dobSection.append(dobTitle)
	  		dobSection.append(dob)
	  		playerTable.append(dobSection)

	  		var nbaSection = $("<tr>")
	  		var nbaTitle = $("<th>NBA Debut</th>")
	  		var nbaDebut = $("<td>" + players[i].nbaDebutYear + "<td>")

	  		nbaSection.append(nbaTitle)
	  		nbaSection.append(nbaDebut)
	  		playerTable.append(nbaSection)

	  		var yearsProSection = $("<tr>")
	  		var yearsProTitle = $("<th>Years Pro</th>")
	  		var yearsPro = $("<td>" + players[i].yearsPro + "<td>")

	  		yearsProSection.append(yearsProTitle)
	  		yearsProSection.append(yearsPro)
	  		playerTable.append(yearsProSection)

	  		var statureSection = $("<tr>")
	  		var statureSectionTitle = $("<th colspan=2>Stature</th>").addClass("tableSection")

	  		statureSection.append(statureSectionTitle)
	  		playerTable.append(statureSection)

	  		var heightSection = $("<tr>")
	  		var heightTitle = $("<th>Height</th>")
	  		var height = $("<td>"+ players[i].heightFeet + "' " + players[i].heightInches + "<td>")

	  		heightSection.append(heightTitle)
	  		heightSection.append(height)
	  		playerTable.append(heightSection)

	  		var weightSection = $("<tr>")
	  		var weightTitle = $("<th>Weight</th>")
	  		var weight = $("<td>" + players[i].weightPounds + "</td>")

	  		weightSection.append(weightTitle)
	  		weightSection.append(weight)
	  		playerTable.append(weightSection)

	  		var cardAction = $("<div>").addClass("card-action")
	  		var statsAction = $("<a data-person=" + players[i].personId + " data-jersey=" + players[i].jersey + " data-namefirst=" + players[i].firstName + " data-namelast=" + players[i].lastName + " class='waves-effect waves-light btn actionButton'>View Stats</a>")
	  		var addAction = $("<a id='" + players[i].personId + "' class='waves-effect waves-light btn actionButton'>Draft</a>")

	  		cardAction.append(statsAction)
	  		cardAction.append(addAction)
	  		cardContent.append(cardTitle)
	  		cardContent.append(playerTable)
	  		cardClass.append(cardContent)
	  		cardClass.append(cardAction)
	  		col.append(cardClass)
	  		card.append(col)

	  		var section = document.getElementById(players[i].teamId); 

	  		var idSection = $(section).attr("id")
	  		if(idSection == players[i].teamId) {
	  			$(section).append(card)
	  		}
	  	}
	  })
	}

	function showDetails() {
		console.log(this)
		var thisPlayer = this;
		var thePlayer = thisPlayer.getAttribute("data-person");
    var playerfirst = thisPlayer.getAttribute("data-namefirst")
    var playerlast = thisPlayer.getAttribute("data-namelast")
    var playerJersey = thisPlayer.getAttribute("data-jersey")
    var playerInfo = "#" + playerJersey + " - " + playerfirst + " " + playerlast
    document.getElementById('modalHeader').innerHTML = playerInfo
    $.ajax({
      method: 'GET',
      url: '/nba/stats/' + thePlayer
    }).done(function(data) {
      console.log(data) 

      var careerAll = data.CareerTotalsRegularSeason
      var collegeAll = data.CareerTotalsCollegeSeason
      var seasonRank = data.SeasonRankingsRegularSeason
      var nbaSeasons = data.SeasonTotalsRegularSeason
      var collegeSeasons = data.SeasonTotalsCollegeSeason

      var totalsSlide = $('<div href="#totals">').addClass("carousel-item red white-text")
      var totalsTitle = $('<h2>NBA and College Career Totals</h2>')
	    var totalsTable = $('<table style="width:100%">')

	    var totalsHeaders = $('<tr>')
	    var totalsFGTA = $('<th>3 Point FG Attempts</th>')
	    var totalsFGTM = $('<th>3 Point FG Total</th>')
	    var totalsFGA = $('<th>FG Attempts</th>')
	    var totalsFGM = $('<th>FG Total</th>')
	    var totalsFTA = $('<th>FT Attempts</th>')
	    var totalsFTM = $('<th>FT Total</th>')
	    var totalsPts = $('<th>Points</th>')
	    var totalsAssists = $('<th>Assists</th>')
	    var totalsBlocks = $('<th>Blocks</th>')
	    var totalsDR = $('<th>Defensive Rebounds</th>')
	    var totalsOR = $('<th>Offensive Rebounds</th>')
	    var totalsReb = $('<th>Rebounds</th>')
	    var totalsStl = $('<th>Steals</th>')
	    var totalsFouls = $('<th>Fouls</th>')
	    var totalsGP = $('<th>Games Played</th>')
	    var totalsGS = $('<th>Games Sat</th>')
	    var totalsMin = $('<th>Minutes</th>')

	    totalsTable.append(totalsHeaders)
	    totalsTable.append(totalsFGTA)
	    totalsTable.append(totalsFGTM)
	    totalsTable.append(totalsFGA)
	    totalsTable.append(totalsFGM)
	    totalsTable.append(totalsFTA)
	    totalsTable.append(totalsFTM)
	    totalsTable.append(totalsPts)
	    totalsTable.append(totalsAssists)
	    totalsTable.append(totalsBlocks)
	    totalsTable.append(totalsDR)
	    totalsTable.append(totalsOR)
	    totalsTable.append(totalsReb)
	    totalsTable.append(totalsStl)
	    totalsTable.append(totalsFouls)
	    totalsTable.append(totalsGP)
	    totalsTable.append(totalsGS)
	    totalsTable.append(totalsMin)

	    if (careerAll.length != 0) {

	    }

<table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th> 
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td>80</td>
  </tr>
</table>

      totalsSlide.append(totalsTitle)

      $('#modalPlayer').modal('open');
    }) 
	}

	getTeams()

}); //end doc