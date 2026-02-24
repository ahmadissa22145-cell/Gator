import { eq, sql } from "drizzle-orm";
import { db } from "../index";
import { feeds} from "../schema";
import { readConfig } from "src/config";
import { getUserByName } from "./users";
import { getCurrentUserFromConfig } from "src/utilities";
import { date, datetime } from "drizzle-orm/mysql-core";
import { fetchFeed } from "src/RSS";
import { createPost } from "./Posts";





export async function createFeed(name: string, url: string){

    try{

        const user = await getCurrentUserFromConfig();

        const [result] = await db.insert(feeds).values({name: name,url: url,user_id: user.id}).returning();

        return result;
    }catch(err){
        throw err;
    }
}

export async function GetAllFeeds(){

    try{

        const result = await db.select().from(feeds);

        return result;
    }catch(err){
        throw err;
    }
}

export async function GetFeedByURL(url: string){

    try{

        const [result] = await db.select().from(feeds).where(eq(feeds.url, url));

        return result;

    }catch(err){
        throw err;
    }
}

export async function markFeedFetched(feed_id: string){

    try{

        const [result] = await db.update(feeds).
                               set({last_fetched_at: new Date(), updated_at: new Date()}).
                               where(eq(feeds.id, feed_id));

        return result;

    }catch(err){
        throw err;
    }
}

export async function getNextFeedToFetch(){

    try{

        const [result] = await db.select().
                               from(feeds).
                               orderBy(sql`${feeds.last_fetched_at} ASC NULLS FIRST`).
                               limit(1);

        return result;

    }catch(err){
        throw err;
    }
}

export async function scrapeFeeds(){

    const feed = await getNextFeedToFetch();

    if(!feed) {
        console.log("No feeds found. Waiting for new feeds...");
        return;
    }

    await markFeedFetched(feed.id);

    console.log(`Fetching feed: ${feed.name}`);

    const feedData = await fetchFeed(feed.url);

    const items = feedData.items;

    for (const item of feedData.items) {

        const publishedAt = item.pubDate
            ? new Date(item.pubDate)
            : null;

        await createPost(
            item.title,
            item.link,
            publishedAt,
            item.description,
            feed.id
        );
    }

    
}

