import client from "../../client";
import bcrypt from "bcrypt"

export default {
    Mutation: {
        createAccount: async(_,{name,username,email,location,avatarURL,githubUsername,password}) => {
            let overlaped = null;
            try{
                overlaped = await client.user.findFirst({
                    where:{
                        OR:[{username},{email}]
                    }
                })
                if (overlaped)
                    throw new Error("email or username is existing");
                else{
                    const hashedPass = await bcrypt.hash(password,10);
                    const result = await client.user.create({
                        data:{
                            username,name,location,avatarURL,githubUsername,password:hashedPass,email
                        }
                    })
                    console.log(result);
                    if (result){
                        console.log(result);
                        return {
                            ok:true
                        }
                    }
                }
            }catch(error){
                if (overlaped)
                    return {
                        ok: false,
                        error: error.message
                    }
                else
                    return {
                        ok: false,
                        error: "server error",
                    }
            }
        }
    }
}