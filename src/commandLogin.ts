import { setUser } from "./config";
import { getUserByName } from "./lib/db/queries/users";


export async function handlerLogin(cmdName: string , ...args: string[]){

    if(args.length === 0)
        throw new Error("a username is required");

    const username = args[0];

    const user = await getUserByName(username);
    
    if(!user)
         throw new Error("You can't login to an account that doesn't exist!");


    await setUser(username);
    

    console.log("the user has been set");
}