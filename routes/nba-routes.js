var nba = require("nba.js").default;

var data = require("nba.js").data;
var stats = require("nba.js").stats;

module.exports= function(app){

	app.get('/nba/teams/:yr', function(req, res){

		nba.data.teamsConfig({
		  year: req.params.yr 
		}).then(function(data) {
		  res.json(data)
		}).catch(function(err) {
		  console.error(err);
		});
	});

	app.get('/nba/players/:yr', function(req, res) {
		nba.data.players({
		  year: req.params.yr
		}).then(function(data) {
		  res.json(data)
		}).catch(function(err) {
		  console.error(err);
		});
	})

	app.get('/nba/stats/:playerid', function(req, res) {
		nba.stats.playerCareerStats({
			PerMode: 'Totals',
			PlayerID: req.params.playerid
		}).then(function(data) {
			res.json(data)
		}).catch(function(err) {
			console.log(err); 
		})
	})

	app.get('/nba/playerCompare/:arr1/:arr2', function(req, res) {
		nba.stats.playerCompare({
			PlayerIDList: req.params.arr1,
			VsPlayerIDList: req.params.arr2
		}).then(function(data) {
			res.json(data)
		}).catch(function(err) {
			console.log(err); 
		})
	})

}