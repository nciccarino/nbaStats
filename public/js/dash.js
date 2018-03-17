$(document).ready(function() { 

	var userSelect;

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

		console.log(team1)
		console.log(team2)

		$.ajax({
			type: 'GET',
			url:'/playerInfo/' + team1
		}).done(function(data){
			console.log(data)
		})

		$.ajax({
			type: 'GET',
			url:'/playerInfo/' + team2
		}).done(function(data){
			console.log(data)
		})

  }

  getEmail();

}) // End Document