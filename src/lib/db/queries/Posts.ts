import { desc, eq } from "drizzle-orm";
import { db } from "../index";
import { feedFollows, feeds, posts } from "../schema";



export async function createPost(title: string, url : string, pubDate: Date | null, description: string, feed_id: string) {
    try{

        const [post] = await db.insert(posts).values({title: title, url: url, published_at: pubDate, description: description, feed_id: feed_id}).returning();

        return post;
    }catch(err){
        console.log(`${err}`);
    }
}

export async function getPostsForUser(user_id: string, limit: number) {
   const result = await db
        .select({
            id: posts.id,
            created_at: posts.created_at,
            updated_at: posts.updated_at,
            title: posts.title,
            url: posts.url,
            description: posts.description,
            published_at: posts.published_at,
            feed_name: feeds.name,
        })
        .from(posts)
        .innerJoin(feeds, eq(posts.feed_id, feeds.id))
        .innerJoin(feedFollows, eq(feeds.id, feedFollows.feed_id))
        .where(eq(feedFollows.user_id, user_id))
        .orderBy(desc(posts.published_at))
        .limit(limit);

    return result;
}