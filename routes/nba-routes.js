var nba = require("nba.js").default;

var data = require("nba.js").data;
var stats = require("nba.js").stats;

module.exports= function(app){

	app.get('/nba/teams/', function(req, res){

		nba.data.teamsConfig({
		  year: 2017
		}).then(function(data) {
		  res.json(data)
		}).catch(function(err) {
		  console.error(err);
		});
	});

	app.get('/nba/players/', function(req, res) {
		nba.data.players({
		  year: 2017
		}).then(function(data) {
		  res.json(data)
		}).catch(function(err) {
		  console.error(err);
		});
	})

}