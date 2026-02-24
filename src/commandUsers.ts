import { readConfig } from "./config";
import { GetAllUsers } from "./lib/db/queries/users";




export async function handlerListUsers(cmdName: string, ...args: string[]) {
    
   const users = await GetAllUsers();
   const current_user_name = (await readConfig()).currentUserName;

   if(!current_user_name || current_user_name === "")
        throw new Error("The current username does not exist in the .gatorconfig.json file, Please log in again.");

   users.forEach(u => {

    if(u.name === current_user_name)
        console.log(`* ${u.name} (current)`);
    else
        console.log(`* ${u.name}`);

   });

}