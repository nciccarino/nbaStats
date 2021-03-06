// HTML routes for client side navigation

// Dependencies

var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/signup", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    });

    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../public/html/login.html"));
    });
    
    app.get("/home", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/html/home.html"));
        } else {
            res.redirect("/");
        }
    });

    app.get("/dash", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/html/dash.html"));
        } else {
            res.redirect("/");
        }
    });

};