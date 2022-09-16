import { gql } from "apollo-server";

export default gql`
type User{
    id: String!
    name: String!
    username: String!
    email: String!
    location: String!
    avatarURL: Upload
    githubUsername: String!
    createdAt: String!
    updatedAt: String! 
}
`