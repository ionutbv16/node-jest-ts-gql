export const projectsTypeDefs = `#graphql
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