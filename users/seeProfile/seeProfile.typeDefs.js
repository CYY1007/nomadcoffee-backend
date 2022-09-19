import { gql } from "apollo-server";

export default gql`
type Profile{
    ok: Boolean!,
    error: String,
    userInfo: User,
    followings : [User],
    followers : [User]
}
type Query{
    seeProfile(username:String!,followerCursor:Int,followingCursor:Int): Profile
}
`