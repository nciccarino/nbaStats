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
	  		MIL: '../images/logos/bucks.svg',
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
	  		// var teamHeaderTri = $("<img src=" + teamLogo[tricode] + " class='tri'>")
	  		var teamHeaderTri = $('<div style="background-image: url(' + teamLogo[tricode] + '); width: 100px; height: 100px; background-position: center center; background-repeat: no-repeat; background-size: cover; "></div>')
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

	  		var cardAction = $("<div>").addClass("card-action playerActions")
	  		var statsAction = $("<a data-drafted=" + 0 + " data-person=" + players[i].personId + " data-jersey=" + players[i].jersey + " data-namefirst=" + players[i].firstName + " data-namelast=" + players[i].lastName + " class='waves-effect waves-light btn actionButton'>View Stats</a>")
	  		var addAction = $("<a data-person=" + players[i].personId + " data-jersey=" + players[i].jersey + " data-namefirst=" + players[i].firstName + " data-namelast=" + players[i].lastName + " data-pos=" + players[i].pos + " class='draftBtn waves-effect waves-light btn'>Draft</a>")

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

		$(".statsRows").html("");

		var thisPlayer = this;
		var thePlayer = thisPlayer.getAttribute("data-person");
		var playerJersey = thisPlayer.getAttribute("data-jersey")
		var playerInfo; 

		if(thisPlayer.getAttribute("data-drafted") == 0) {
	    var playerfirst = thisPlayer.getAttribute("data-namefirst")
	    var playerlast = thisPlayer.getAttribute("data-namelast")
	    playerInfo = "#" + playerJersey + " - " + playerfirst + " " + playerlast
	    document.getElementById('modalHeader').innerHTML = playerInfo
		} else if(thisPlayer.getAttribute("data-drafted") == 1) {
    	var playerFull = thisPlayer.getAttribute("data-name")
    	var playerPos = thisPlayer.getAttribute("data-pos")
    	playerInfo = "#" + playerJersey + " - " + playerFull + " (" + playerPos + ")"
      document.getElementById('modalHeader').innerHTML = playerInfo
    }
    
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

			var totalsLi = $('<li>').addClass('tableLi')
      var totalsCol = $('<div class="collapsible-header">NBA and College Career Totals</div>').addClass('liCol')
      var totalsTab = $('<div class="collapsible-body"></div>')
	    var totalsTable = $('<table class="modalTables">')
			
			var regLi = $('<li>').addClass('tableLi')
      var regCol = $('<div class="collapsible-header">NBA Regular Sesaon Totals</div>').addClass('liCol')
      var regTab = $('<div class="collapsible-body"></div>')
	    var regTable = $('<table class="modalTables">')

			var collLi = $('<li>').addClass('tableLi')
      var collCol = $('<div class="collapsible-header">College Regular Sesaon Totals</div>').addClass('liCol')
      var collTab = $('<div class="collapsible-body"></div>')
	    var collTable = $('<table class="modalTables">')

			var rankLi = $('<li>').addClass('tableLi')
      var rankCol = $('<div class="collapsible-header">NBA Regular Sesaon Rankings</div>').addClass('liCol')
      var rankTab = $('<div class="collapsible-body"></div>')
	    var rankTable = $('<table class="modalTables">')

	    // Totals    

	    var totalsHeaders = $('<tr>')
	    var totalsLeague = $('<th></th>')
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

	    totalsHeaders.append(totalsLeague)
	    totalsHeaders.append(totalsFGTA)
	    totalsHeaders.append(totalsFGTM)
	    totalsHeaders.append(totalsFGA)
	    totalsHeaders.append(totalsFGM)
	    totalsHeaders.append(totalsFTA)
	    totalsHeaders.append(totalsFTM)
	    totalsHeaders.append(totalsPts)
	    totalsHeaders.append(totalsAssists)
	    totalsHeaders.append(totalsBlocks)
	    totalsHeaders.append(totalsDR)
	    totalsHeaders.append(totalsOR)
	    totalsHeaders.append(totalsReb)
	    totalsHeaders.append(totalsStl)
	    totalsHeaders.append(totalsFouls)
	    totalsHeaders.append(totalsGP)
	    totalsHeaders.append(totalsGS)
	    totalsHeaders.append(totalsMin)
	    totalsTable.append(totalsHeaders)

	    if (careerAll.length != 0) {
		    var totalsNBA = $('<tr>')
		    var nbaTitle = $('<td>NBA</td>')
		    var fgtaTotals = $('<td>' + careerAll[0].fg3a + '</td>')
		    var fgtmTotals = $('<td>' + careerAll[0].fg3m + ' (' + Math.round(careerAll[0].fg3_pct * 100) + '%)' + '</td>')
		    var fgaTotals = $('<td>' + careerAll[0].fga + '</td>')
		    var fgmTotals = $('<td>' + careerAll[0].fgm + ' (' + Math.round(careerAll[0].fg_pct * 100) + '%)' + '</td>')
		    var ftaTotals = $('<td>' + careerAll[0].fta + '</td>')
		    var ftmTotals = $('<td>' + careerAll[0].ftm + ' (' + Math.round(careerAll[0].ft_pct * 100) + '%)' + '</td>')
		    var ptsTotals = $('<td>' + careerAll[0].pts + '</td>')
		    var assistsTotals = $('<td>' + careerAll[0].ast + '</td>')
		    var blocksTotals = $('<td>' + careerAll[0].blk + '</td>')
		    var drTotals = $('<td>' + careerAll[0].dreb + '</td>')
		    var orTotals = $('<td>' + careerAll[0].oreb + '</td>')
		    var rebTotals = $('<td>' + careerAll[0].reb + '</td>')
		    var stlTotals = $('<td>' + careerAll[0].stl + '</td>')
		    var foulsTotals = $('<td>' + careerAll[0].pf + '</td>')
		    var gpTotals = $('<td>' + careerAll[0].gp + '</td>')
		    var gsTotals = $('<td>' + careerAll[0].gs + '</td>')
		    var minTotals = $('<td>' + careerAll[0].min + '</td>')

		    totalsNBA.append(nbaTitle)
		    totalsNBA.append(fgtaTotals)
		    totalsNBA.append(fgtmTotals)
		    totalsNBA.append(fgaTotals)
		    totalsNBA.append(fgmTotals)
		    totalsNBA.append(ftaTotals)
		    totalsNBA.append(ftmTotals)
		    totalsNBA.append(ptsTotals)
		    totalsNBA.append(assistsTotals)
		    totalsNBA.append(blocksTotals)
		    totalsNBA.append(drTotals)
		    totalsNBA.append(orTotals)
		    totalsNBA.append(rebTotals)
		    totalsNBA.append(stlTotals)
		    totalsNBA.append(foulsTotals)
		    totalsNBA.append(gpTotals)
		    totalsNBA.append(gsTotals)
		    totalsNBA.append(minTotals)
		    totalsTable.append(totalsNBA)
	    }

	    if (collegeAll.length != 0) {
		    var totalsCollege = $('<tr>')
		    var collegeTitle = $('<td>College</td>')
		    var fgtaCollegeTotals = $('<td>' + collegeAll[0].fg3a + '</td>')
		    var fgtmCollegeTotals = $('<td>' + collegeAll[0].fg3m + ' (' + Math.round(collegeAll[0].fg3_pct * 100) + '%)' + '</td>')
		    var fgaCollegeTotals = $('<td>' + collegeAll[0].fga + '</td>')
		    var fgmCollegeTotals = $('<td>' + collegeAll[0].fgm + ' (' + Math.round(collegeAll[0].fg_pct * 100) + '%)' + '</td>')
		    var ftaCollegeTotals = $('<td>' + collegeAll[0].fta + '</td>')
		    var ftmCollegeTotals = $('<td>' + collegeAll[0].ftm + ' (' + Math.round(collegeAll[0].ft_pct * 100) + '%)' + '</td>')
		    var ptsCollegeTotals = $('<td>' + collegeAll[0].pts + '</td>')
		    var assistsCollegeTotals = $('<td>' + collegeAll[0].ast + '</td>')
		    var blocksCollegeTotals = $('<td>' + collegeAll[0].blk + '</td>')
		    var drCollegeTotals = $('<td>' + collegeAll[0].dreb + '</td>')
		    var orCollegeTotals = $('<td>' + collegeAll[0].oreb + '</td>')
		    var rebCollegeTotals = $('<td>' + collegeAll[0].reb + '</td>')
		    var stlCollegeTotals = $('<td>' + collegeAll[0].stl + '</td>')
		    var foulsCollegeTotals = $('<td>' + collegeAll[0].pf + '</td>')
		    var gpCollegeTotals = $('<td>' + collegeAll[0].gp + '</td>')
		    var gsCollegeTotals = $('<td>' + collegeAll[0].gs + '</td>')
		    var minCollegeTotals = $('<td>' + collegeAll[0].min + '</td>')

		    totalsCollege.append(collegeTitle)
		    totalsCollege.append(fgtaCollegeTotals)
		    totalsCollege.append(fgtmCollegeTotals)
		    totalsCollege.append(fgaCollegeTotals)
		    totalsCollege.append(fgmCollegeTotals)
		    totalsCollege.append(ftaCollegeTotals)
		    totalsCollege.append(ftmCollegeTotals)
		    totalsCollege.append(ptsCollegeTotals)
		    totalsCollege.append(assistsCollegeTotals)
		    totalsCollege.append(blocksCollegeTotals)
		    totalsCollege.append(drCollegeTotals)
		    totalsCollege.append(orCollegeTotals)
		    totalsCollege.append(rebCollegeTotals)
		    totalsCollege.append(stlCollegeTotals)
		    totalsCollege.append(foulsCollegeTotals)
		    totalsCollege.append(gpCollegeTotals)
		    totalsCollege.append(gsCollegeTotals)
		    totalsCollege.append(minCollegeTotals)
		    totalsTable.append(totalsCollege)
	    }

	    totalsTab.append(totalsTable)
	    totalsLi.append(totalsCol)
	    totalsLi.append(totalsTab)

	    // Regular Season 

	    var regHeaders = $('<tr>')
	    var regYear = $('<th>Season</th>')
	    var regTeam = $('<th>Team</th>')
	    var regFGTA = $('<th>3 Point FG Attempts</th>')
	    var regFGTM = $('<th>3 Point FG Total</th>')
	    var regFGA = $('<th>FG Attempts</th>')
	    var regFGM = $('<th>FG Total</th>')
	    var regFTA = $('<th>FT Attempts</th>')
	    var regFTM = $('<th>FT Total</th>')
	    var regPts = $('<th>Points</th>')
	    var regAssists = $('<th>Assists</th>')
	    var regBlocks = $('<th>Blocks</th>')
	    var regDR = $('<th>Defensive Rebounds</th>')
	    var regOR = $('<th>Offensive Rebounds</th>')
	    var regReb = $('<th>Rebounds</th>')
	    var regStl = $('<th>Steals</th>')
	    var regFouls = $('<th>Fouls</th>')
	    var regGP = $('<th>Games Played</th>')
	    var regGS = $('<th>Games Sat</th>')
	    var regMin = $('<th>Minutes</th>')

	    regHeaders.append(regYear)
	    regHeaders.append(regTeam)
	    regHeaders.append(regFGTA)
	    regHeaders.append(regFGTM)
	    regHeaders.append(regFGA)
	    regHeaders.append(regFGM)
	    regHeaders.append(regFTA)
	    regHeaders.append(regFTM)
	    regHeaders.append(regPts)
	    regHeaders.append(regAssists)
	    regHeaders.append(regBlocks)
	    regHeaders.append(regDR)
	    regHeaders.append(regOR)
	    regHeaders.append(regReb)
	    regHeaders.append(regStl)
	    regHeaders.append(regFouls)
	    regHeaders.append(regGP)
	    regHeaders.append(regGS)
	    regHeaders.append(regMin)
	    regTable.append(regHeaders)

	    for(var i = 0; i < nbaSeasons.length; i++) {

		    var regularNBA = $('<tr>')
		    var yearRegular = $('<td>' + nbaSeasons[i].season_id + '</td>')
		    var teamRegular = $('<td>' + nbaSeasons[i].team_abbreviation + '</td>')
		    var fgtaRegular = $('<td>' + nbaSeasons[i].fg3a + '</td>')
		    var fgtmRegular = $('<td>' + nbaSeasons[i].fg3m + ' (' + Math.round(nbaSeasons[i].fg3_pct * 100) + '%)' + '</td>')
		    var fgaRegular = $('<td>' + nbaSeasons[i].fga + '</td>')
		    var fgmRegular = $('<td>' + nbaSeasons[i].fgm + ' (' + Math.round(nbaSeasons[i].fg_pct * 100) + '%)' + '</td>')
		    var ftaRegular = $('<td>' + nbaSeasons[i].fta + '</td>')
		    var ftmRegular = $('<td>' + nbaSeasons[i].ftm + ' (' + Math.round(nbaSeasons[i].ft_pct * 100) + '%)' + '</td>')
		    var ptsRegular = $('<td>' + nbaSeasons[i].pts + '</td>')
		    var assistsRegular = $('<td>' + nbaSeasons[i].ast + '</td>')
		    var blocksRegular = $('<td>' + nbaSeasons[i].blk + '</td>')
		    var drRegular = $('<td>' + nbaSeasons[i].dreb + '</td>')
		    var orRegular = $('<td>' + nbaSeasons[i].oreb + '</td>')
		    var rebRegular = $('<td>' + nbaSeasons[i].reb + '</td>')
		    var stlRegular = $('<td>' + nbaSeasons[i].stl + '</td>')
		    var foulsRegular = $('<td>' + nbaSeasons[i].pf + '</td>')
		    var gpRegular = $('<td>' + nbaSeasons[i].gp + '</td>')
		    var gsRegular = $('<td>' + nbaSeasons[i].gs + '</td>')
		    var minRegular = $('<td>' + nbaSeasons[i].min + '</td>')

		    regularNBA.append(yearRegular)
		    regularNBA.append(teamRegular)
		    regularNBA.append(fgtaRegular)
		    regularNBA.append(fgtmRegular)
		    regularNBA.append(fgaRegular)
		    regularNBA.append(fgmRegular)
		    regularNBA.append(ftaRegular)
		    regularNBA.append(ftmRegular)
		    regularNBA.append(ptsRegular)
		    regularNBA.append(assistsRegular)
		    regularNBA.append(blocksRegular)
		    regularNBA.append(drRegular)
		    regularNBA.append(orRegular)
		    regularNBA.append(rebRegular)
		    regularNBA.append(stlRegular)
		    regularNBA.append(foulsRegular)
		    regularNBA.append(gpRegular)
		    regularNBA.append(gsRegular)
		    regularNBA.append(minRegular)
		    regTable.append(regularNBA)	    	
	    }

	    regTab.append(regTable)
	    regLi.append(regCol)
	    regLi.append(regTab)

	    // College Seasons
	    if(collegeSeasons.length != 0) { 
		    var collHeaders = $('<tr>')
		    var collYear = $('<th>Season</th>')
		    var collTeam = $('<th>Team</th>')
		    var collFGTA = $('<th>3 Point FG Attempts</th>')
		    var collFGTM = $('<th>3 Point FG Total</th>')
		    var collFGA = $('<th>FG Attempts</th>')
		    var collFGM = $('<th>FG Total</th>')
		    var collFTA = $('<th>FT Attempts</th>')
		    var collFTM = $('<th>FT Total</th>')
		    var collPts = $('<th>Points</th>')
		    var collAssists = $('<th>Assists</th>')
		    var collBlocks = $('<th>Blocks</th>')
		    var collDR = $('<th>Defensive Rebounds</th>')
		    var collOR = $('<th>Offensive Rebounds</th>')
		    var collReb = $('<th>Rebounds</th>')
		    var collStl = $('<th>Steals</th>')
		    var collFouls = $('<th>Fouls</th>')
		    var collGP = $('<th>Games Played</th>')
		    var collGS = $('<th>Games Sat</th>')
		    var collMin = $('<th>Minutes</th>')

		    collHeaders.append(collYear)
		    collHeaders.append(collTeam)
		    collHeaders.append(collFGTA)
		    collHeaders.append(collFGTM)
		    collHeaders.append(collFGA)
		    collHeaders.append(collFGM)
		    collHeaders.append(collFTA)
		    collHeaders.append(collFTM)
		    collHeaders.append(collPts)
		    collHeaders.append(collAssists)
		    collHeaders.append(collBlocks)
		    collHeaders.append(collDR)
		    collHeaders.append(collOR)
		    collHeaders.append(collReb)
		    collHeaders.append(collStl)
		    collHeaders.append(collFouls)
		    collHeaders.append(collGP)
		    collHeaders.append(collGS)
		    collHeaders.append(collMin)
		    collTable.append(collHeaders)

		    for(var i = 0; i < collegeSeasons.length; i++) {

			    var regularColl = $('<tr>')
			    var yearColl = $('<td>' + collegeSeasons[i].season_id + '</td>')
			    var teamColl = $('<td>' + collegeSeasons[i].school_name + '</td>')
			    var fgtaColl = $('<td>' + collegeSeasons[i].fg3a + '</td>')
			    var fgtmColl = $('<td>' + collegeSeasons[i].fg3m + ' (' + Math.round(collegeSeasons[i].fg3_pct * 100) + '%)' + '</td>')
			    var fgaColl = $('<td>' + collegeSeasons[i].fga + '</td>')
			    var fgmColl = $('<td>' + collegeSeasons[i].fgm + ' (' + Math.round(collegeSeasons[i].fg_pct * 100) + '%)' + '</td>')
			    var ftaColl = $('<td>' + collegeSeasons[i].fta + '</td>')
			    var ftmColl = $('<td>' + collegeSeasons[i].ftm + ' (' + Math.round(collegeSeasons[i].ft_pct * 100) + '%)' + '</td>')
			    var ptsColl = $('<td>' + collegeSeasons[i].pts + '</td>')
			    var assistsColl = $('<td>' + collegeSeasons[i].ast + '</td>')
			    var blocksColl = $('<td>' + collegeSeasons[i].blk + '</td>')
			    var drColl = $('<td>' + collegeSeasons[i].dreb + '</td>')
			    var orColl = $('<td>' + collegeSeasons[i].oreb + '</td>')
			    var rebColl = $('<td>' + collegeSeasons[i].reb + '</td>')
			    var stlColl = $('<td>' + collegeSeasons[i].stl + '</td>')
			    var foulsColl = $('<td>' + collegeSeasons[i].pf + '</td>')
			    var gpColl = $('<td>' + collegeSeasons[i].gp + '</td>')
			    var gsColl = $('<td>' + collegeSeasons[i].gs + '</td>')
			    var minColl = $('<td>' + collegeSeasons[i].min + '</td>')

			    regularColl.append(yearColl)
			    regularColl.append(teamColl)
			    regularColl.append(fgtaColl)
			    regularColl.append(fgtmColl)
			    regularColl.append(fgaColl)
			    regularColl.append(fgmColl)
			    regularColl.append(ftaColl)
			    regularColl.append(ftmColl)
			    regularColl.append(ptsColl)
			    regularColl.append(assistsColl)
			    regularColl.append(blocksColl)
			    regularColl.append(drColl)
			    regularColl.append(orColl)
			    regularColl.append(rebColl)
			    regularColl.append(stlColl)
			    regularColl.append(foulsColl)
			    regularColl.append(gpColl)
			    regularColl.append(gsColl)
			    regularColl.append(minColl)
			    collTable.append(regularColl)	    	
		    }

			  collTab.append(collTable)
			  collLi.append(collCol)
			  collLi.append(collTab)
			}

	    // Ranking Regular Season 

	    var rankHeaders = $('<tr>')
	    var rankYear = $('<th>Season</th>')
	    var rankTeam = $('<th>Team</th>')
	    var rankFGTA = $('<th>3 Point FG Attempts</th>')
	    var rankFGTM = $('<th>3 Point FG Total</th>')
	    var rankFGA = $('<th>FG Attempts</th>')
	    var rankFGM = $('<th>FG Total</th>')
	    var rankFTA = $('<th>FT Attempts</th>')
	    var rankFTM = $('<th>FT Total</th>')
	    var rankPts = $('<th>Points</th>')
	    var rankAssists = $('<th>Assists</th>')
	    var rankBlocks = $('<th>Blocks</th>')
	    var rankDR = $('<th>Defensive Rebounds</th>')
	    var rankOR = $('<th>Offensive Rebounds</th>')
	    var rankReb = $('<th>Rebounds</th>')
	    var rankStl = $('<th>Steals</th>')
	    var rankMin = $('<th>Minutes</th>')

	    rankHeaders.append(rankYear)
	    rankHeaders.append(rankTeam)
	    rankHeaders.append(rankFGTA)
	    rankHeaders.append(rankFGTM)
	    rankHeaders.append(rankFGA)
	    rankHeaders.append(rankFGM)
	    rankHeaders.append(rankFTA)
	    rankHeaders.append(rankFTM)
	    rankHeaders.append(rankPts)
	    rankHeaders.append(rankAssists)
	    rankHeaders.append(rankBlocks)
	    rankHeaders.append(rankDR)
	    rankHeaders.append(rankOR)
	    rankHeaders.append(rankReb)
	    rankHeaders.append(rankStl)
	    rankHeaders.append(rankMin)
	    rankTable.append(rankHeaders)

	    for(var i = 0; i < seasonRank.length; i++) {

		    var rankNBA = $('<tr>')
		    var yearRank = $('<td>' + seasonRank[i].season_id + '</td>')
		    var teamRank = $('<td>' + seasonRank[i].team_abbreviation + '</td>')
		    var fgtaRank = $('<td>' + seasonRank[i].rank_fg3a + '</td>')
		    var fgtmRank = $('<td>' + seasonRank[i].rank_fg3m + '</td>')
		    var fgaRank = $('<td>' + seasonRank[i].rank_fga + '</td>')
		    var fgmRank = $('<td>' + seasonRank[i].rank_fgm + '</td>')
		    var ftaRank = $('<td>' + seasonRank[i].rank_fta + '</td>')
		    var ftmRank = $('<td>' + seasonRank[i].rank_ftm + '</td>')
		    var ptsRank = $('<td>' + seasonRank[i].rank_pts + '</td>')
		    var assistsRank = $('<td>' + seasonRank[i].rank_ast + '</td>')
		    var blocksRank = $('<td>' + seasonRank[i].rank_blk + '</td>')
		    var drRank = $('<td>' + seasonRank[i].rank_dreb + '</td>')
		    var orRank = $('<td>' + seasonRank[i].rank_oreb + '</td>')
		    var rebRank = $('<td>' + seasonRank[i].rank_reb + '</td>')
		    var stlRank = $('<td>' + seasonRank[i].rank_stl + '</td>')
		    var minRank = $('<td>' + seasonRank[i].rank_min + '</td>')

		    rankNBA.append(yearRank)
		    rankNBA.append(teamRank)
		    rankNBA.append(fgtaRank)
		    rankNBA.append(fgtmRank)
		    rankNBA.append(fgaRank)
		    rankNBA.append(fgmRank)
		    rankNBA.append(ftaRank)
		    rankNBA.append(ftmRank)
		    rankNBA.append(ptsRank)
		    rankNBA.append(assistsRank)
		    rankNBA.append(blocksRank)
		    rankNBA.append(drRank)
		    rankNBA.append(orRank)
		    rankNBA.append(rebRank)
		    rankNBA.append(stlRank)
		    rankNBA.append(minRank)
		    rankTable.append(rankNBA)	    	
	    }

	    rankTab.append(rankTable)
	    rankLi.append(rankCol)
	    rankLi.append(rankTab)

	    // final product 
	    $(".statsRows").append(totalsLi)
	    $(".statsRows").append(regLi)
	    if(collegeSeasons.length != 0) {
	    	$(".statsRows").append(collLi)
	    }
	    $(".statsRows").append(rankLi)

      $('#modalPlayer').modal('open');
    }) 
	}

	getTeams()

}); //end doc