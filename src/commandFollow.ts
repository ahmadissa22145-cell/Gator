import { User } from "./feedsHelper";
import { createFeedFollow, isFollowed } from "./lib/db/queries/feed_follow";
import { createFeed, GetFeedByURL } from "./lib/db/queries/feeds";
import { fetchFeed } from "./RSS";
import { getCurrentUserFromConfig } from "./utilities";




export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
    
    if(args.length < 1) throw new Error("Usage: follow <url>");

    const url = args[0];

    let feed = await GetFeedByURL(url);

    if(await isFollowed(user.id, feed.id)) {
        console.log("You are already following this feed.");
        return;
    }
    
    if(!feed){
        const feedName = (await fetchFeed(url)).channel.title;

        feed = await createFeed(feedName, url);
    }


    const followData = await createFeedFollow(user.id, feed.id);

    console.log(`User ${followData.userName} is now following ${followData.feedName}`);

}