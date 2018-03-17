$(document).ready(function() { 

	var userSelect;
	var teamSelect1;
	var teamSelect2;

	$(document.body).on("click", '.callCompare', getPlayers);

  function getEmail() {
    $.get("/api/user_data").then(function(data){
      console.log(data)
      var emailData = data.email; 
      userSelect = data.id; 
      allInfo()
    })
  }

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
  }

  function getPlayers() {

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
			console.log(arrTeam1)
		}).then(function() {
			$.ajax({
				type: 'GET',
				url:'/playerInfo/' + team2
			}).done(function(data){
				for(var i = 0; i < data.length; i++) {
					var person = data[i].person_id
					arrTeam2.push(person)
				}
				console.log(arrTeam2)
			}).then(function() {
				$.ajax({
					type: 'GET',
					url:'/nba/playerCompare/' + arrTeam1 + '/' + arrTeam2
				}).done(function(data){ 
					console.log(data)
					var info1 = data.OverallCompare[0];
					var info2 = data.OverallCompare[1]; 

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

				})
			})
		})
  }

  getEmail();

}) // End Document