import client from "../../client"
import { protectResolver } from "../users.utils"

const UnfollowUserResolver = async(_,{username},{loggedInUser}) =>{
    try{
    if(!loggedInUser || !username)
        throw Error("something is wrong..")
    const target = await client.user.findUnique({
        where: {username}
    });
    if (!target)
        throw Error("user is not found")
    await client.user.update({
        where:{
            id: loggedInUser.id
        },
        data:{
            following:{
                disconnect:{
                    username
                }
            }
        }
    })
    return {
        ok: true,
    }
    }catch(error){
        return {
            ok: false,
            error: error.message
        }
    }
}


export default {
    Mutation:{
        UnfollowUser: protectResolver(UnfollowUserResolver)
    }
}