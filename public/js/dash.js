$(document).ready(function() { 

	// global variables
	var userSelect;
	var teamSelect1;
	var teamSelect2;

	// NBA Season Oct 17 – Jun 17
	// If Oct - Dec, use current year, otherwise -1 for NBA Season year

	var yr;
	var month = new Date().getMonth()

	if(month == 10 || 11 || 12) {
		yr = new Date().getFullYear()
	}
	if(month < 10) {
		yr = new Date().getFullYear() - 1 
	}

	// Event Listeners
	$(document.body).on("click", '.callCompare', getPlayers);
	$(document.body).on("click", '.callPlayerCompare', comparePlayers);

  function getEmail() {
    $.get("/api/user_data").then(function(data){
      var emailData = data.email; 
      userSelect = data.id; 
      allInfo()
    })
  } // done getEmail 

  function allInfo() {
		$.ajax({
			type: 'GET',
			url:'/allInfo/' + userSelect
		}).done(function(data){
			console.log(data)

			var teams = data[0].teams

			for(var i = 0; i < teams.length; i++) {
				$('select').material_select();
				var option = $("<option data-icon='" + teams[i].image + "' class='left circle' value='" + teams[i].team_id + "'>" + teams[i].name + "</option>")
				$("#select1").append(option)
			}
			for(var j = 0; j < teams.length; j++) {
				$('select').material_select();
				var option = $("<option data-icon='" + teams[j].image + "' class='left circle' value='" + teams[j].team_id + "'>" + teams[j].name + "</option>")
				$("#select2").append(option)
			}
		});
  } // done allInfo

  function getPlayers() {

  	$(".chartWrapper").css("display", "none")
  	$(".progLine").css("display", "block")

  	var e = document.getElementById("select1");
		var team1 = e.options[e.selectedIndex].value;
		teamSelect1 = e.options[e.selectedIndex].innerHTML

		var f = document.getElementById("select2");
		var team2 = f.options[f.selectedIndex].value;
		teamSelect2 = f.options[f.selectedIndex].innerHTML

		var arrTeam1 = [];
		var arrTeam2 = []; 

		$.ajax({
			type: 'GET',
			url:'/playerInfo/' + team1
		}).done(function(data){
			for(var i = 0; i < data.length; i++) {
				var person = data[i].person_id
				arrTeam1.push(person)
			}
		}).then(function() {
			$.ajax({
				type: 'GET',
				url:'/playerInfo/' + team2
			}).done(function(data){
				for(var i = 0; i < data.length; i++) {
					var person = data[i].person_id
					arrTeam2.push(person)
				}
			}).then(function() {
				$.ajax({
					type: 'GET',
					url:'/nba/playerCompare/' + arrTeam1 + '/' + arrTeam2
				}).done(function(data){ 

					$(".progLine").css("display", "none")
					$(".chartWrapper").css("display", "block")

					console.log(data)
					var info1 = data.OverallCompare[0];
					var info2 = data.OverallCompare[1]; 
					var ind = data.Individual; 

				  var ctx = document.getElementById('myChart').getContext('2d');
					var chart = new Chart(ctx, {
					    // The type of chart we want to create
					    type: 'bar',

					    // The data for our dataset
					    data: {
					        labels: ["Assists", "Blocks", "Blocks Against", "Def Rebounds", "Off Rebounds", "Personal Fouls", "Personal Fouls Drawn", "Steals", "Turnovers", "Plus/Minus"],
					        datasets: [
										{
											label: teamSelect1,
											backgroundColor: 'rgb(52,152,219)',
											borderColor: 'rgb(52,152,219)',
											data: [info1.ast, info1.blk, info1.blka, info1.dreb, info1.oreb, info1.pf, info1.pfd, info1.stl, info1.tov, info1.plus_minus]
										},
						        {
											label: teamSelect2,
											backgroundColor: 'rgb(240,164,59)',
											borderColor: 'rgb(240,164,59)',
											data: [info2.ast, info2.blk, info2.blka, info2.dreb, info2.oreb, info2.pf, info2.pfd, info2.stl, info2.tov, info2.plus_minus]
										}	        
					        ]
					    },

					    // Configuration options go here
					    options: {}
					});

					var fg3_1 = Math.round(info1.fg3_pct * 100); 
					var fg3_2 = Math.round(info2.fg3_pct * 100);

				  var ctx = document.getElementById('myChart2').getContext('2d');
					var chart = new Chart(ctx, {
					    // The type of chart we want to create
					    type: 'doughnut',

					    // The data for our dataset
					    data: {
					    		labels: [teamSelect1, teamSelect2],
					        datasets: [
										{
											label: teamSelect1,
											backgroundColor: ['rgb(52,152,219)', 'rgb(240,164,59)'],
											borderColor: ['rgb(52,152,219)', 'rgb(240,164,59)'], 
											data: [fg3_1, fg3_2]
										}      
					        ]
					    },

					    // Configuration options go here
					    options: {}
					});

					var fg_1 = Math.round(info1.fg_pct * 100); 
					var fg_2 = Math.round(info2.fg_pct * 100);

				  var ctx = document.getElementById('myChart3').getContext('2d');
					var chart = new Chart(ctx, {
					    // The type of chart we want to create
					    type: 'doughnut',

					    // The data for our dataset
					    data: {
					    		labels: [teamSelect1, teamSelect2],
					        datasets: [
										{
											label: teamSelect1,
											backgroundColor: ['rgb(52,152,219)', 'rgb(240,164,59)'],
											borderColor: ['rgb(52,152,219)', 'rgb(240,164,59)'], 
											data: [fg_1, fg_2]
										}      
					        ]
					    },

					    // Configuration options go here
					    options: {}
					});

					var ft_1 = Math.round(info1.ft_pct * 100); 
					var ft_2 = Math.round(info2.ft_pct * 100);

				  var ctx = document.getElementById('myChart4').getContext('2d');
					var chart = new Chart(ctx, {
					    // The type of chart we want to create
					    type: 'doughnut',

					    // The data for our dataset
					    data: {
					    		labels: [teamSelect1, teamSelect2],
					        datasets: [
										{
											label: teamSelect1,
											backgroundColor: ['rgb(52,152,219)', 'rgb(240,164,59)'],
											borderColor: ['rgb(52,152,219)', 'rgb(240,164,59)'], 
											data: [ft_1, ft_2]
										}      
					        ]
					    },

					    // Configuration options go here
					    options: {}
					});
				});
			})
		})
  } // done getPlayers

	function initAuto() {
	  $.ajax({
	  	method:'GET', 
	    url: "/nba/players/" + yr
	  }).done(function(data) {
	  	var players = data.league.standard
	  	console.log(players)

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

	  	var dataAuto = {}; 

	  	for(var i = 0; i < players.length; i++) {

	  		// autolookup section

	  		var img = null; 

	  		if(players[i].teamId == 1610612737) {
	  			img = teamLogo.ATL
	  		}
	  		if(players[i].teamId == 1610612751) {
	  			img = teamLogo.BKN
	  		}
	  		if(players[i].teamId == 1610612738) {
	  			img = teamLogo.BOS
	  		}
	  		if(players[i].teamId == 1610612766) {
	  			img = teamLogo.CHA
	  		}
	  		if(players[i].teamId == 1610612741) {
	  			img = teamLogo.CHI
	  		}
	  		if(players[i].teamId == 1610612739) {
	  			img = teamLogo.CLE
	  		}
	  		if(players[i].teamId == 1610612742) {
	  			img = teamLogo.DAL
	  		}
	  		if(players[i].teamId == 1610612743) {
	  			img = teamLogo.DEN
	  		}
	  		if(players[i].teamId == 1610612765) {
	  			img = teamLogo.DET
	  		}
	  		if(players[i].teamId == 1610612744) {
	  			img = teamLogo.GSW
	  		}
	  		if(players[i].teamId == 1610612745) {
	  			img = teamLogo.HOU
	  		}
	  		if(players[i].teamId == 1610612754) {
	  			img = teamLogo.IND
	  		}
	  		if(players[i].teamId == 1610612744) {
	  			img = teamLogo.GSW
	  		}
	  		if(players[i].teamId == 1610612746) {
	  			img = teamLogo.LAC
	  		}
	  		if(players[i].teamId == 1610612747) {
	  			img = teamLogo.LAL
	  		}
	  		if(players[i].teamId == 1610612763) {
	  			img = teamLogo.MEM
	  		}
	  		if(players[i].teamId == 1610612748) {
	  			img = teamLogo.MIA
	  		}
	  		if(players[i].teamId == 1610612749) {
	  			img = teamLogo.MIL
	  		}
	  		if(players[i].teamId == 1610612750) {
	  			img = teamLogo.MIN
	  		}
	  		if(players[i].teamId == 1610612740) {
	  			img = teamLogo.NOP
	  		}
	  		if(players[i].teamId == 1610612752) {
	  			img = teamLogo.NYK
	  		}
	  		if(players[i].teamId == 1610612760) {
	  			img = teamLogo.OKC
	  		}
	  		if(players[i].teamId == 1610612753) {
	  			img = teamLogo.ORL
	  		}
	  		if(players[i].teamId == 1610612755) {
	  			img = teamLogo.PHI
	  		}
	  		if(players[i].teamId == 1610612756) {
	  			img = teamLogo.PHX
	  		}
	  		if(players[i].teamId == 1610612757) {
	  			img = teamLogo.POR
	  		}
	  		if(players[i].teamId == 1610612758) {
	  			img = teamLogo.SAC
	  		}
	  		if(players[i].teamId == 1610612759) {
	  			img = teamLogo.SAS
	  		}
	  		if(players[i].teamId == 1610612761) {
	  			img = teamLogo.TOR
	  		}
	  		if(players[i].teamId == 1610612762) {
	  			img = teamLogo.UTA
	  		}
	  		if(players[i].teamId == 1610612764) {
	  			img = teamLogo.WAS
	  		}

	  		var prop = "" + players[i].firstName + " " + players[i].lastName + " - " + players[i].personId + "";
	  		dataAuto[prop] = img;
	  	}
	  	autoComp(dataAuto)
	  })
	}

	function autoComp(data) {
		$('input.autocomplete').autocomplete({
			data: data,
			limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
			minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
		});  
	}

	function comparePlayers() {

		var opt1 = $(".auto1").val()
		var opt2 = $(".auto2").val()

		console.log(opt1)
		console.log(opt2)

	}

  getEmail();
  initAuto(); 

}) // End Document