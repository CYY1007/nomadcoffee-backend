import client from "../../client";
import bcrypt from "bcrypt"
import {createWriteStream} from "fs"
import { protectResolver } from "../users.utils";

const editProfileResolver = async(_,{name,username,email,location,avatarURL,githubUsername,password:oldpass},{loggedInUser}) =>{
    try{
        if(!loggedInUser)
            throw Error("404 user not found...");
            let fileURL = null;
        if (avatarURL){
            const {filename:uploadedFileName,createReadStream} = await avatarURL;
            const realFileName = `${loggedInUser.id}-${Date.now()}-${uploadedFileName}`;
            const readStream = createReadStream();
            const writeStream = createWriteStream(process.cwd() + "/uploads/" + realFileName);
            readStream.pipe(writeStream);
            fileURL = `http://localhost:4000/static/${realFileName}`;
        }
        let hashedPass = null;
        if (oldpass){
            hashedPass = await bcrypt.hash(oldpass,10);
        }
        const updateduser = await client.user.update({
            where:{id: loggedInUser.id},
            data:{
                name,
                username,
                email,
                location,
                avatarURL,
                githubUsername,
                ...(hashedPass && {password: hashedPass}),
                ...(avatarURL && {avatarURL : fileURL}),
            }
        })
        if (updateduser.id)
            return{
                ok: true
            }
        else
            throw Error("something is wrong...")
    }catch(error){
        return {
            ok: false,
            error: error.message
        }
    }
}

export default {
    Mutation: {
        editProfile: protectResolver(editProfileResolver),
    }
}