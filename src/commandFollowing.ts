import { User } from "./feedsHelper";
import { getFeedFollowsForUser } from "./lib/db/queries/feed_follow";
import { getCurrentUserFromConfig } from "./utilities";




export async function handlerFollowing(cmdName: string, user: User, ...args: string[]) {

    const user_id = user.id;
    
    const feedFollows = await getFeedFollowsForUser(user_id);

    feedFollows.forEach(f =>{

        console.log(f.feedname);
    });
}