import client from "../../client"

export default {
    Query:{
        seeProfile: async(_,{username,followerCursor,followingCursor}) => {
            try{
                if (!username)
                    throw Error("username is lost..")
                const targetUser = await client.user.findUnique({
                    where:{username}
                });
                if (!targetUser)
                    throw Error("user is not found...")
                const followers = await client.user.findUnique({
                    where:{username}
                }).followers({
                    take: 3,
                    skip: followerCursor? 1: 0,
                    ...(followerCursor && {cursor : {id:followerCursor}})
                });
                const followings = await client.user.findUnique({
                    where:{username}
                }).following({
                    take: 3,
                    skip: followingCursor ? 1: 0,
                    ...(followingCursor && {cursor: {id: followingCursor}})
                })
                console.log(followers,followings);
                return{
                    ok: true,
                    userInfo : targetUser,
                    followers,
                    followings,
                }
            }catch(e){
                return{
                    ok: false,
                    error : e.message
                }
            }
        }
    }
}