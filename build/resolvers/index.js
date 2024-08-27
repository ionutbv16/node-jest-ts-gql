"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const ProjectsResolver_1 = require("./ProjectsResolver");
exports.resolvers = {
    getProjects: ProjectsResolver_1.ProjectsResolver.getProjects,
    getProjectByID: ProjectsResolver_1.ProjectsResolver.getProjectByID,
};
