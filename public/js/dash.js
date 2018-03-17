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

		var f = document.getElementById("select2");
		var team2 = f.options[f.selectedIndex].value;

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
				})
			})
		})
  }

  getEmail();

}) // End Document