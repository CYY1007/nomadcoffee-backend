import client from "../client";

export default {
    User:{
        isMe: async({id},_,{loggedInUser}) =>{
            if (!loggedInUser)
                return false;
            return id === loggedInUser.id;
        },
        totalFollowings: async({id}) => {
            return client.user.count({
                where:{
                    followers:{
                        some:{
                            id
                        }
                    }
                }
            })
        },
        totalFollowers: async({id}) =>{
            return await client.user.count({
                where:{
                    following:{
                        some:{
                            id
                        }
                    }
                }
            })
        }
    }
}