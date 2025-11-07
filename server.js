/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: _____Phoenix Ouyang_____ Student ID: ____135264240____ Date: November 9, 2025_____
*
********************************************************************************/

require("dotenv").config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const projectData = require("./modules/projects");
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

// sector search route
app.get("/solutions/projects", (req, res) => {
    const sector = req.query.sector;

    if (!sector) {
        projectData.getAllProjects().then((projects) => {
            res.render("projects", 
                {projects: projects});
        });
    }
    else {
        projectData.getProjectsBySector(sector)
        .then((projects) => {
            res.render("projects", 
                {projects: projects});
        })
        .catch((err) => {
            res.render("404", {
                errorMsg: err
            });
        });
    }
});

// project id route
app.get("/solutions/projects/:id", (req, res) => {
    const id = req.params.id;

    projectData.getProjectById(id)
        .then((project) => {
            res.render("project", 
                {project: project});
        })
        .catch((err) => {
            res.render("404", {
                errorMsg: err
            });
        });
});

// catch requests for routes that don't exist
app.use((req, res, next) => {
  res.render("404", {
    errorMsg: "Sorry, we couldn't find what you're looking for."
  })
});

projectData.Initialize()
    .then(() => {
        app.listen(port, () => console.log(`Application listening on port ${port}`));
    })
    .catch((err) => {
        console.log(err);
    });
