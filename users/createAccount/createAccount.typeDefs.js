import { gql } from "apollo-server";

export default gql`
type createAccountResult{
    ok: Boolean!
    error: String
}
type Mutation{
    createAccount( 
    name: String!,
    username: String!,
    password: String!,
    email: String!,
    location: String!
    avatarURL: String,
    githubUsername: String!,): createAccountResult
}
`