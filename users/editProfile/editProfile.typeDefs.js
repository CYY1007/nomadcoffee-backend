import { gql } from "apollo-server";

export default gql`
type editProfileResult {
    ok: Boolean!
    error: String
}
type Mutation {
    editProfile(
        name: String, username: String, password: String, email: String, localhost: String, avatarURL: Upload, githubUsername: String
    ) : editProfileResult
}
`