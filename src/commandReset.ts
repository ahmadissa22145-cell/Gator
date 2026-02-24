import { Reset } from "./lib/db/queries/users";



export async function handlerReset(cmdName: string, ...args: string[]){

    await Reset();
} 