$(document).ready(function() { 

	var userSelect;
	var trueDate; 
	var addDropdown; 
	var src = "../images/logos/nets.png"; 

	// $('.draftBtn').on("click", function() {
	// 	console.log("hit")
	// 	$(this).append(addDropdown)
	// })

	$('#createTeam').on('click', handleAdd)

  function getEmail() {
    $.get("/api/user_data").then(function(data){
      console.log(data)
      var emailData = data.email; 
      userSelect = data.id; 
      // $("#loginID2").html("<b>" + emailData + "</b>");
      allInfo()
    })
  }

  $('.logoImages').on('click', getImage)

  function getImage() {
  	var image = this;
  	src = $(image).attr("src")
  }

	function formatDate() {
	    var d = new Date(),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}

  function allInfo() {
		$.ajax({
			type: 'GET',
			url:'/allInfo/' + userSelect
		}).done(function(data){
			console.log(data)

			var teams = data[0].teams 

			addDropdown = $("<ul id='dropdown1' class='dropdown-content addList'></ul>")

	  	for(var i = 0; i < teams.length; i++) {

	  		var teamOption = $('<li><a data-team=' + teams[i].team_id + ' href="#!">' + teams[i].name + '</a></li>')
	  		addDropdown.append(teamOption)

	  		var myDeadline = moment(teams[i].deadline).format('ll'); 
	  		var newDate = formatDate()

	  		var teamWrapper = $("<li>")
	  		var teamHeader = $("<div>").addClass("collapsible-header teamHeader " + teams[i].team_id);
	  		var teamHeaderTri = $('<div style="background-image: url(' + teams[i].image + '); width: 100px; height: 100px; background-position: center center; background-repeat: no-repeat; background-size: cover; "></div>')
	  		var teamHeaderHolder = $("<ul>")
	  		var teamHeaderTitle = $("<li class='myTeam'>" + teams[i].name + "</li>")
	  		var teamHeaderSub = $("<li class='subheading'>" + teams[i].subheading + "</li>")
	  		//var teamHeaderDeadline = $("<li class='myDeadline'>" + myDeadline + "</li>")
				var teamBody = $("<div id='" + teams[i].team_id + "' style='background-color: " + teams[i].primaryColor +"'>").addClass("collapsible-body row teamSection")
				var teamEdit = $('<a data-team=' + teams[i].team_id + ' class="waves-effect waves-light btn editTeam">Edit Team</a>')
				var infoWrapper = $("<div>").addClass("infoWrapper")
				var infoBody = $("<div class='description'>" + teams[i].description + "</div>")
				var infoDeadline; 
				if(teams[i].deadline > newDate) {
					infoDeadline = $("<div class='deadline green'>" + myDeadline + "</div>")
				}
				if(teams[i].deadline <= newDate) {
					infoDeadline = $("<div class='deadline red'>" + myDeadline + "</div>")
				}

				infoWrapper.append(infoBody)
				infoWrapper.append(infoDeadline)
				teamBody.append(teamEdit)
				teamBody.append(infoWrapper)
				teamHeaderHolder.append(teamHeaderTitle)
				if (teams[i].subheading != '') {
					teamHeaderHolder.append(teamHeaderSub)
				}
	  		teamHeader.append(teamHeaderTri);
	  		teamHeader.append(teamHeaderHolder);
	  		teamWrapper.append(teamHeader);
	  		teamWrapper.append(teamBody);
	  		$(".myTeamsHolder").append(teamWrapper);
	  	}
		})
  }

  function testDates() {
  	var deadline = $('#deadline').val()
  	console.log(deadline)
		var str = deadline.replace(",", "");
		console.log(str)
		var res = str.split(" ");
		console.log(res)

		var day = res[0]
		var month;
		var year = res[2]

		if (res[1] == "January") {
			month = "-01-";
		}
		if (res[1] == "February") {
			month = "-02-";
		}
		if (res[1] == "March") {
			month = "-03-";
		}
		if (res[1] == "April") {
			month = "-04-";
		}
		if (res[1] == "May") {
			month = "-05-";
		}
		if (res[1] == "June") {
			month = "-06-";
		}
		if (res[1] == "July") {
			month = "-07-";
		}
		if (res[1] == "August") {
			month = "-08-";
		}
		if (res[1] == "September") {
			month = "-09-";
		}
		if (res[1] == "October") {
			month = "-10-";
		}
		if (res[1] == "November") {
			month = "-11-";
		}
		if (res[1] == "December") {
			month = "-12-";
		}

		trueDate = year + month + day 

		console.log(trueDate)
  }

  function handleAdd() {
  	var userid = userSelect; 
  	var name = $('#name').val().trim()
  	var subheading = $('#subheading').val().trim()
  	var description = $('#description').val().trim()

  	testDates()
  	var deadline = trueDate

  	var primaryColor = $('#colorPick').val()

  	var newTeam = {
  		user_id: userSelect,
  		name: name,
  		subheading: subheading,
  		description: description,
  		primaryColor: primaryColor,
  		image: src, 
  		deadline: deadline,
  		active: 1
  	}

  	submitTeam(newTeam)

  }

  function submitTeam(Team) {
		$.ajax({
			type: 'POST',
			url:'/api/teams',
			data: Team
		}).done(function(){
			console.log("posted data");	
			window.location.href = "/home";
		})
  }

  getEmail();

})