import { readConfig } from "./config";
import { getUserByName } from "./lib/db/queries/users";


export function parseCliArgs(argv: string[]){

    const args = argv.slice(2);

    if(args.length === 0){

        console.error("not enough arguments were provided");
        process.exit(1);
    }

    return {
        cmdName: args[0],
        cmdArgs: args.slice(1),
    };
}

export async function getCurrentUserFromConfig(){

    const username = readConfig().currentUserName;
        
    if(!username)
        throw new Error("Please login first.");

    const user = await getUserByName(username);
    
    if(!user)
        throw new Error(`User ${username} not found`);


    return user;
}


