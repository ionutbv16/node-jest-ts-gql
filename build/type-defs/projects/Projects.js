"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsTypeDefs = void 0;
exports.projectsTypeDefs = `#graphql
type Query {
  getProjects: [Project]
}

type Query {
  getProjectByID (
    id: ID!
  ): Project
}
type Project {
  id: ID!
  url: String
  country: String
  status: String!
}
`;
