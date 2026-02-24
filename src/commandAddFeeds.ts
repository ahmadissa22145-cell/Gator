import { createFeed } from "src/lib/db/queries/feeds";
import { printFeed, User } from "./feedsHelper";
import { getCurrentUserFromConfig } from "./utilities";
import { createFeedFollow } from "./lib/db/queries/feed_follow";



export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {

    if(args.length < 2) throw new Error("Usage: addfeed <name> <url>");

    
    const name = args[0];
    const url = args[1];

    const feed = await createFeed(name, url);

    await createFeedFollow(feed.user_id,feed.id);

    console.log("Feed created successfully:");
    printFeed(feed, user);

}

