
import { User } from "./feedsHelper";
import { unFollow } from "./lib/db/queries/feed_follow";




export async function handlerUnFollow(cmdName: string, user: User, ...args: string[]) {

    if(args.length < 1) throw new Error("Usage: unfollow <url>");
    
    const feedUrl = args[0]; 

    const countDeleted = await unFollow(user.id, feedUrl);

    if(countDeleted < 1){
        console.log("You are not following this feed.");
        return;
    }

    console.log("You have successfully unfollowed this feed.");
}