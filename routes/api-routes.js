var db = require('../models');
var passport = require("../config/passport");

module.exports= function(app){

//PASSPORT ROUTES

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/home");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.users.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {

      console.log("ERROR: " + err)
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/teams", function(req, res) {
    db.teams.create({
      user_id: req.body.user_id,
      name: req.body.name,
      subheading: req.body.subheading,
      description: req.body.description,
      primaryColor: req.body.primaryColor,
      image: req.body.image,  
      deadline: req.body.deadline,
      active: req.body.active
    }).then(function(data) {
      res.json(data)
    }).catch(function(err) {
      console.log(err)
    })
  })

  app.post("/api/newplayer", function(req, res) {
    db.players.create({
      team_id: req.body.team_id,
      person_id: req.body.person_id,
      name: req.body.name,
      jersey: req.body.jersey,
      position: req.body.position
    }).then(function(data) {
      res.json(data)
    }).catch(function(err) {
      console.log(err)
    })
  })

  app.delete("/player/delete", function(req, res) {
    db.players.destroy({
      where: {
        id: req.body.id,
        team_id: req.body.team_id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/teamInfo/:theteamid", (req, res) => {
    db.teams.findAll({
      where: { 
        id: req.params.theteamid
      }
    }).then(function(data) {
      res.json(data); 
    });
  });

  app.put("/api/teams", function(req, res) {
    db.teams.update({
      name: req.body.name,
      subheading: req.body.subheading,
      description: req.body.description,
      primaryColor: req.body.primaryColor,
      image: req.body.image,
      deadline: req.body.deadline
    },
      {
        where: {
          id: req.body.id,
          user_id: req.body.user_id
        }
      }
    ).then(function(data) {
      res.json(data);
    });
  });

  app.delete("/team/delete/:id", function(req, res) {
    db.players.destroy({
      where: {
        team_id: req.params.id
      }
    }).then(function() {
      db.teams.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(data) {
        res.json(data);
      });
    });
  });

  app.get('/playerInfo/:teamid', (req, res) => {
    db.players.findAll({
      where: {
        team_id: req.params.teamid
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get('/allInfo/:id', (req, res) => {  
      db.users.findAll({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: db.teams,
            include: [
              {
                model: db.players
              }
            ]
          }
        ]
      }).then(users => {
        const resObj = users.map(user => {

          //tidy up the user data
          return Object.assign(
            {},
            {
              user_id: user.id,
              email: user.email,
              role: user.role,
              teams: user.teams.map(team => {

                //tidy up the post data
                return Object.assign(
                  {},
                  {
                    team_id: team.id,
                    user_id: team.user_id,
                    name: team.name,
                    subheading: team.subheading,
                    description: team.description,
                    primaryColor: team.primaryColor,
                    image: team.image, 
                    deadline: team.deadline, 
                    active: team.active,
                    players: team.players.map(player => {

                      //tidy up the comment data
                      return Object.assign(
                        {},
                        {
                          player_id: player.id,
                          team_id: player.team_id,
                          person_id: player.person_id,
                          name: player.name,
                          jersey: player.jersey,
                          position: player.position
                        }
                      )
                    })
                  }
                  )
              })
            }
          )
        });
        res.json(resObj)
      });
    });

}//end module.exports