$(document).ready(function() {

	function getTeams() {
	  $.ajax({
	  	method:'GET', 
	    url: "/nba/teams/"
	  }).done(function(data) {
	  	var teams = data.teams.config
	  	for(var i = 0; i < teams.length; i++) {
	  		var teamWrapper = $("<li>")
	  		var teamHeader = $("<div>").addClass("collapsible-header teamHeader " + teams[i].teamId);
	  		var teamHeaderTri = $("<div style='background-color: " + teams[i].primaryColor +";' class='tri'>" + teams[i].tricode + "</div>")
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

	function getPlayers() {
	  $.ajax({
	  	method:'GET', 
	    url: "/nba/players/"
	  }).done(function(data) {
	  	var players = data.league.standard
	  	//console.log(players)
	  	for(var i = 0; i < players.length; i++) {
	  		var card = $("<div id='" + players[i].personId + "'>").addClass("playerCards")
	  		var col = $("<div>").addClass("col s6 m3")
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

	  		var dobSection = $("<tr>")
	  		var dobTitle = $("<th>Date of Birth</th>")
	  		var dob = $("<td>" + players[i].dateOfBirthUTC + "<td>")

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
	  		var height = $("<td>"+ players[i].heightFeet + " Feet, " + players[i].heightInches + "<td>")

	  		heightSection.append(heightTitle)
	  		heightSection.append(height)
	  		playerTable.append(heightSection)

	  		var weightSection = $("<tr>")
	  		var weightTitle = $("<th>Weight</th>")
	  		var weight = $("<td>" + players[i].weightPounds + "<td>")

	  		weightSection.append(weightTitle)
	  		weightSection.append(weight)
	  		playerTable.append(weightSection)

	  		var cardAction = $("<div>").addClass("card-action")
	  		var statsAction = $("<a href='#'>View Stats</a>")
	  		var addAction = $("<a href='#'>Add Player</a>")

	  		cardContent.append(cardTitle)
	  		cardContent.append(playerTable)
	  		cardAction.append(statsAction)
	  		cardAction.append(addAction)
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

	getTeams()

}); //end doc