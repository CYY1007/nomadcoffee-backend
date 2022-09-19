import client from "../../client"
import { protectResolver } from "../users.utils"

const followUserResolver = async(_,{username},{loggedInUser}) =>{
    try{
        if (!username || !loggedInUser)
            throw Error("user is not found or you are not login")
        const target = await client.user.findUnique({
            where:{username}
        })
        if (!target)
            throw Error("user is not found")
        await client.user.update({
            where:{id: loggedInUser.id},
            data:{
                following:{
                    connect:{
                        username
                    }
                }
            }
        })
        return{
            ok:true
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
        followUser : protectResolver(followUserResolver),
    }
}