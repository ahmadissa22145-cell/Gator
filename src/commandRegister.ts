import { setUser } from "./config";
import { createUser } from "./lib/db/queries/users";



export async function handlerRegister(cmdName: string, ...args: string[]) {
    
    if(args.length === 0)
        throw new Error("a username is required.");
        
    const username = args[0];

    const user = await createUser(username);

    await setUser(username);
    console.log("User registered successfully.");
    console.log(user);   
}