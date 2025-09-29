/********************************************************************************
* WEB322 – Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: _____Phoenix Ouyang_____ Student ID: ____135264240____ Date: _____September 27, 2025_____
*
********************************************************************************/

require("dotenv").config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const projectData = require("./modules/projects");

app.use(express.static('public'));

app.get("/", (req, res) => 
    res.send("Assignment 1 - Phoenix Ouyang - 135264240")
);

app.get("/solutions/projects", (req, res) => {
    projectData.getAllProjects().then((projects) => {
        res.json(projects);
    });
});

app.get("/solutions/projects/id-demo", (req, res) => {
    projectData.getProjectById(9)
        .then((project) => {
            res.json(project);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

app.get("/solutions/projects/sector-demo", (req, res) => {
    projectData.getProjectsBySector("agri")
        .then((projects) => {
            res.json(projects);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

projectData.Initialize()
    .then(() => {
        app.listen(port, () => console.log(`Application listening on port ${port}`));
    })
    .catch((err) => {
        console.log(err);
    });
