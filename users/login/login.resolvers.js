import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export default {
    Mutation:{
        login : async(_,{username, password}) =>{
            try{
                let token = null;
                const user = await client.user.findUnique({
                    where:{username}
                })
                if(!user)
                    throw Error("404 user not found..")
                else{
                    const checkPassword = await bcrypt.compare(password,user.password);
                    if (!checkPassword)
                        throw Error("401 Unauthorized")
                    else
                        token = jwt.sign({id: user.id},process.env.SECRET_STRING);
                    return {
                        ok: true,
                        token
                    }
                }
            }catch(error){
                return{
                    ok: false,
                    error: error.message
                }
            }
        }
    }
}