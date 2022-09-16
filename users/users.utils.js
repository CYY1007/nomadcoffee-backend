import client from "../client";
import jwt from "jsonwebtoken"

export const getUser = async(token) =>{
    try{
        if (!token)
            return null;
        const {id} = jwt.verify(token,process.env.SECRET_STRING);
        const user = await client.user.findUnique({
            where: {id}
        })
        return user;
    }catch(error){
        console.log(error)
        return null;
    }
}

export const protectResolver  = (targetResolver) => {
    return async (root, args, context, info) =>{
        if (!context.loggedInUser)
            return {
                ok : false,
                error: "you need to login first"
            }
        else
            return targetResolver(root,args,context,info);
    }
}