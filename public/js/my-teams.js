$(document).ready(function() { 

	var userSelect;
	var trueDate; 
	var src = "../images/logos/nets.png"; 
	var theImage; 
	var hit = false; 
	var addArr = [];
	var updateId; 

	$(document.body).on("click", '.draftBtn', addPlayer);
	$('#createTeam').on('click', handleAdd)
	$('#btnMore').on('click', function() {
		$(".logoMore").css("display", "inline-block")
		$('#btnMore').css("display", "none")
	})
	$('#btnMoreUpdate').on('click', function() {
		$(".logoUpdate").css("display", "inline-block")
		$('#btnMoreUpdate').css("display", "none")
	})
	$('.logoImages').on('click', getImage)
	$(document.body).on("click", '.logoImagesForm', getImageTeam);
	$(document.body).on("click", '#createPlayer', wasHit);
	$(document.body).on("click", '.removeBtn', removeToast); 
	$(document.body).on("click", '.cutPlayer', cutPlayer);
	$(document.body).on("click", '.editTeam', showEdit);
	$('#updateTeam').on('click', handleUpdate)
	$(document.body).on("click", '#deleteTeamBtn', deleteTeam);

	$(".newLogoBtn").click(function(){
	    $(".newLogo").toggle();
	});

  function getEmail() {
    $.get("/api/user_data").then(function(data){
      console.log(data)
      var emailData = data.email; 
      userSelect = data.id; 
      // $("#loginID2").html("<b>" + emailData + "</b>");
      allInfo()
    })
  }

  function getImage() {
  	var image = this;
  	src = $(image).attr("src")
  }

  function getImageTeam() {
  	hit = true; 
  	console.log("getImageTeam")
  	var teamImage = this;
  	theImage = teamImage.getAttribute("data-team"); 
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

			var addForm = $('<div>')
			var addRow = $('<div class="row">')
			var addCol = $('<div class="input-field teamInput col s12">')

	  	for(var i = 0; i < teams.length; i++) {

	  		var teamOption = $('<div class="imgGrid"><input type="image" src="' + teams[i].image + '" data-team=' + teams[i].team_id + ' href="#" class="logoImagesForm"><div class="teamLabel">' + teams[i].name + '</div></div>')
	  		addCol.append(teamOption)

	  		var myDeadline = moment(teams[i].deadline).format('ll'); 
	  		var newDate = formatDate()

	  		var teamWrapper = $("<li>")
	  		var teamHeader = $("<div>").addClass("collapsible-header teamHeader " + teams[i].team_id);
	  		var teamHeaderTri = $('<div class="dropImg" style="background-image: url(' + teams[i].image + ');"></div>')
	  		var teamHeaderHolder = $("<ul>")
	  		var teamHeaderTitle = $("<li class='myTeam'>" + teams[i].name + " (" + teams[i].players.length + ")</li>")
	  		var teamHeaderSub = $("<li class='subheading'>" + teams[i].subheading + "</li>")

				var teamBody = $("<div id='" + teams[i].team_id + "' style='background-color: " + teams[i].primaryColor +"'>").addClass("collapsible-body row teamSection")
				var teamEdit = $('<a data-team=' + teams[i].team_id + ' class="waves-effect waves-light btn editTeam">Update Team</a>')
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

				var players = teams[i].players

				for(var j = 0; j < players.length; j++) {

		  		var card = $("<div id='" + players[j].person_id + "'>").addClass("playerCards")
		  		var col = $("<div>").addClass("col s12 m4")
		  		var cardClass = $("<div>").addClass("card blue-grey darken-1") 

		  		var cardContent = $("<div>").addClass("card-content white-text")
		  		var	cardTitle = $("<span>#" + players[j].jersey + " - " + players[j].name_first + " " + players[j].name_last + " (" + players[j].position + ")</span>").addClass("card-title playerName") 

		  		var cardAction = $("<div>").addClass("card-action playerActions")
		  		var statsAction = $("<a data-drafted=" + 1 + " data-person=" + players[j].person_id + " data-jersey=" + players[j].jersey + " data-namefirst=" + players[j].name_first + "data-namelast=" + players[j].name_last + " data-pos=" + players[j].position + " class='waves-effect waves-light btn actionButton'>View Stats</a>")
		  		var removeAction = $("<a data-person=" + players[j].player_id + " data-namefirst=" + players[j].name_first + "data-namelast=" + players[j].name_last + " data-team=" + players[j].team_id + " class='waves-effect waves-light btn removeBtn'>Cut Player</a>")

		  		cardAction.append(statsAction)
		  		cardAction.append(removeAction)
		  		cardContent.append(cardTitle)
		  		cardClass.append(cardContent)
		  		cardClass.append(cardAction)
		  		col.append(cardClass)
		  		card.append(col)

		  		var section = document.getElementById(players[j].team_id); 

		  		var idSection = $(section).attr("id")
		  		if(idSection == players[j].team_id) {
		  			$(section).append(card)
		  		}
				}
	  	}
	  	addRow.append(addCol)
  		addForm.append(addRow)
  		$(".addModalPlayer").append(addForm)
		}) 
  }

  function testDates(deadline) {
  	// var deadline = $('#deadline').val()
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

  	var thisDeadline = $('#deadline').val()
  	testDates(thisDeadline)
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
			$(".myTeamsHolder").html("")
			$(".addModalPlayer").html("")
			$('#name').val("")
			$('#subheading').val("")
			$('#description').val("")
			$('#colorPick').val("")
			trueDate = ''
			getEmail()
		})
  }

  function wasHit() {
  	if(theImage != null) {
  		playerSubmit()
  	}
  	if(theImage == null) {
  		alert("Please Select A Team")
  		return; 
  	}
  }

  function addPlayer() {
  	console.log("addPlayer")
  	theImage = null; 
  	$('#modalAddPlayer').modal('open');
		var thisPlayer = this;
		var thePlayer = thisPlayer.getAttribute("data-person");
    var playerfirst = thisPlayer.getAttribute("data-namefirst")
    var playerlast = thisPlayer.getAttribute("data-namelast")
    var playerJersey = thisPlayer.getAttribute("data-jersey")
    var playerPos	= thisPlayer.getAttribute("data-pos"); 
    // var playerName = playerfirst + " " + playerlast; 
 		
 		addArr = []
    addArr.push(thePlayer)
    // addArr.push(playerName)
    addArr.push(playerfirst)
    addArr.push(playerlast)
    addArr.push(playerJersey)
    addArr.push(playerPos)
  }

  function playerSubmit() {
  	console.log("playerSubmit")
  	console.log(addArr)
  	console.log(theImage)

  	var theId = addArr[0]
  	var nameFirst = addArr[1]
  	var nameLast = addArr[2]
  	var theJersey = addArr[3]
  	var thePos = addArr[4]
  	var theTeam = theImage

  	var newPlayer = {
  		team_id: theTeam,
  		person_id: theId,
  		name_first: nameFirst,
  		name_last: nameLast, 
  		jersey: theJersey,
  		position: thePos
  	}

		$.ajax({
			type: 'POST',
			url:'/api/newplayer',
			data: newPlayer
		}).done(function(){
			console.log("posted data");	
			$(".myTeamsHolder").html("")
			$(".addModalPlayer").html("")
			theImage = null
			Materialize.toast(nameFirst + " " + nameLast + ' Added', 6000)
			getEmail()
		})

  }

  function removeToast() {
  	console.log("hit toast")
  	console.log(this)
  	var removeP = this;
  	var pID = removeP.getAttribute("data-person")
  	var pTeam = removeP.getAttribute("data-team")
  	var pNameFirst = removeP.getAttribute("data-namefirst") 
  	var pNameLast = removeP.getAttribute("data-namelast")
  	var $toastContent = $('<span>Are you sure that you want to cut ' + pNameFirst + " " + pNameLast + ' ?</span>').add($('<button data-team=' + pTeam + ' data-id=' + pID + ' class="btn-flat toast-action cutPlayer">Yes, part ways.</button>'));
  	Materialize.toast($toastContent, 10000);
  }

  function cutPlayer() {
  	var freeAgent = this;
  	var agentId = freeAgent.getAttribute("data-id")
  	var agentTeam = freeAgent.getAttribute("data-team")

  	var playerObj = {
  		id: agentId,
  		team_id: agentTeam
  	}

  	$.ajax({
      method: "DELETE",
      url: "/player/delete",
      data: playerObj
    })
    .done(function() {
    	Materialize.Toast.removeAll();
      console.log("Player Deleted")
			$(".myTeamsHolder").html("")
			$(".addModalPlayer").html("")
			$('#name').val("")
			$('#subheading').val("")
			$('#description').val("")
			$('#colorPick').val("")
			trueDate = ''
			getEmail()
    });

  }

  function showEdit() {

  	updateId = this.getAttribute("data-team")
  	var thisTeam = this; 
  	var theTeamId = this.getAttribute("data-team")

		$.ajax({
			type: 'GET',
			url:'/teamInfo/' + theTeamId
		}).done(function(data){
			console.log(data)
	  	var nameThisEdit = $('#nameEdit').val('' + data[0].name + '')
	  	var subheadingThisEdit = $('#subheadingEdit').val('' + data[0].subheading + '')
	  	var descriptionThisEdit = $('#descriptionEdit').val('' + data[0].description + '')
	  	var primaryColorThisEdit = $('#colorPickEdit').val('' + data[0].primaryColor + '')
	  	src = data[0].image;
		})
		$("#deleteTeamBtn").attr("data-team", updateId)
  	$('#modalEditTeam').modal('open');
  }

  function handleUpdate() {
  	var userid = userSelect; 
  	var teamUpdate = updateId
  	var nameEdit = $('#nameEdit').val().trim()
  	var subheadingEdit = $('#subheadingEdit').val().trim()
  	var descriptionEdit = $('#descriptionEdit').val().trim()

  	var deadline = $('#deadlineEdit').val()
  	testDates(deadline)
  	var deadlineEdit = trueDate

  	var primaryColorEdit = $('#colorPickEdit').val()

  	var newUpdate = {
  		id: teamUpdate,
  		user_id: userid, 
  		name: nameEdit,
  		subheading: subheadingEdit,
  		description: descriptionEdit,
  		primaryColor: primaryColorEdit,
  		image: src, 
  		deadline: deadlineEdit
  	}
  	updateTeam(newUpdate)
  }

  function updateTeam(newUpdate) {
		$.ajax({
			type: 'PUT',
			url:'/api/teams',
			data: newUpdate
		}).done(function(){			console.log("posted data");	
			$(".myTeamsHolder").html("")
			$(".addModalPlayer").html("")
			$('#name').val("")
			$('#subheading').val("")
			$('#description').val("")
			$('#colorPick').val("")
			$(".newLogo").toggle();
			trueDate = ''
			getEmail()
		})
  }

  function deleteTeam() {
  	console.log("hit deleteTeam")
  	var theTeamDelete = this; 
  	var teamDelete = theTeamDelete.getAttribute("data-team")
  	console.log(teamDelete)

  	var $toastDelete = $('<span>Are you sure that you want to delete this team?</span>').add($('<button data-team=' + teamDelete + ' id="yesDeleteTeam" class="btn-flat toast-action">Yes, Delete Team</button>'));
  	Materialize.toast($toastDelete, 10000);
  	
  }

  $(document.body).on("click", '#yesDeleteTeam', callDelete);

  function callDelete(){
  	var almostDelete = this; 
  	console.log(almostDelete)
  	var theDeleteTeam = almostDelete.getAttribute("data-team")
  	$.ajax({
      method: "DELETE",
      url: "/team/delete/" + theDeleteTeam
    })
    .done(function() {
    	Materialize.Toast.removeAll();
      console.log("Team Deleted")
			$(".myTeamsHolder").html("")
			$(".addModalPlayer").html("")
			$('#name').val("")
			$('#subheading').val("")
			$('#description').val("")
			$('#colorPick').val("")
			trueDate = ''
			$("#deleteTeamBtn").attr("data-team", "")
			getEmail()
    });
  }

  getEmail();

}) // End Document