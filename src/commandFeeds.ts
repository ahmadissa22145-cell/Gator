import { printFeed } from "./feedsHelper";
import { GetAllFeeds } from "./lib/db/queries/feeds";
import { getUserByID } from "./lib/db/queries/users";


export async function handlerListFeeds() {
    
    const feeds = await GetAllFeeds();
    
  
    for(const feed of feeds){
        
        const user = await getUserByID(feed.user_id)

        printFeed(feed, user);
    }

}