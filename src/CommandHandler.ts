import { handlerAddFeed } from "./commandAddFeeds";
import { handlerAgg } from "./commandAgg";
import { handlerBrowse } from "./commandBrowse";
import { handlerListFeeds } from "./commandFeeds";
import { handlerFollow } from "./commandFollow";
import { handlerFollowing } from "./commandFollowing";
import { handlerLogin } from "./commandLogin";
import { handlerRegister } from "./commandRegister";
import { handlerReset } from "./commandReset";
import { handlerUnFollow } from "./commandUnfollow";
import { handlerListUsers } from "./commandUsers";
import { readConfig } from "./config";
import { getUserByName } from "./lib/db/queries/users";
import { UserCommandHandler } from "./middleware";



type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;
type middlewareLoggedIn  = (handler: UserCommandHandler) => CommandHandler;
 
export type CommandsRegistry = Record<string, CommandHandler>;

export const middlewareLoggedIn = (handler: UserCommandHandler): CommandHandler =>
  async (cmdName: string, ...args: string[]) => {

    const username = readConfig().currentUserName;
            
        if(!username)
            throw new Error("Please login first.");
    
        const user = await getUserByName(username);
        
        if(!user)
            throw new Error(`User ${username} not found`);
    
        return handler(cmdName, user, ...args);
  }

export function registerCommand(registry: CommandsRegistry, cmdName: string,
                         handler: CommandHandler){

    registry[cmdName] = handler;
    
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]){

        const handler = registry[cmdName];

        if(!handler)
            throw new Error(`The ${cmdName} command is not found`);
    
        await handler(cmdName, ...args);
}

export function initCommandsRegistry() {

  const registry: CommandsRegistry  = {};

  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerListUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed",middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "feeds", handlerListFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnFollow));
  registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));

  return registry;
}