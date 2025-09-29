const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function Initialize() {
    projects = [...projectData];

    return new Promise((resolve, reject) => {
        try {
            projects.forEach((data) => {
                let sector = sectorData.find((element) => element.id === data.sector_id)
                data.sector = sector.sector_name;
            });
            resolve();
        } catch {
            reject("Unable to initialize data.");
        }
    });
}

function getAllProjects() {
    return new Promise((resolve) => {
        resolve(projects);
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        let project = projects.find((element) => element.id == projectId);
        project ? resolve(project) :  reject(`Project with id of ${projectId} not found`);
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        let searchSector = sector.toLowerCase();
        let filteredProjects =  projects.filter((proj) => 
            proj.sector.toLowerCase().includes(searchSector)
        );
        filteredProjects.length > 0 ? resolve(filteredProjects) : reject(`Cannot find any projects with sector containing '${sector}'`);
    })
}

module.exports = { Initialize, getAllProjects, getProjectById, getProjectsBySector };