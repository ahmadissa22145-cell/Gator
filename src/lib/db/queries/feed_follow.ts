import { and, eq } from "drizzle-orm";
import { db } from "../index";
import { feedFollows, feeds, users } from "../schema";
import { GetFeedByURL } from "./feeds";




export async function createFeedFollow(user_id: string, feed_id: string) {
    

    const [newFeedFollow] = await db.insert(feedFollows).values({user_id: user_id, feed_id: feed_id}).returning();

    const [data] = await db.select({
        id: feedFollows.id,
        creacreatedAt: feedFollows.created_at,
        updatedAt: feedFollows.updated_at,
        feedName: feeds.name,
        userName: users.name,
    }).from(feedFollows).
      innerJoin(feeds, eq(feedFollows.feed_id, feeds.id)).
      innerJoin(users, eq(feedFollows.user_id, users.id)).
      where(eq(feedFollows.id, newFeedFollow.id));

    return data;
}

export async function getFeedFollowsForUser(user_id: string) {
    
    const userFeedFollows =  await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.created_at,
        updatedAt: feedFollows.updated_at,
        user_id: feedFollows.user_id,
        username: users.name,
        feed_id: feedFollows.feed_id,
        feedname: feeds.name,
    }).from(feedFollows).
       innerJoin(users, eq(feedFollows.user_id, users.id)).
       innerJoin(feeds, eq(feedFollows.feed_id, feeds.id)).
       where(eq(feedFollows.user_id, user_id));

    return userFeedFollows;
}

export async function isFollowed(user_id: string, feed_id: string) {
    
    const existingFollow = await db
                                .select()
                                .from(feedFollows)
                                .where(
                                    and(
                                        eq(feedFollows.user_id, user_id),
                                        eq(feedFollows.feed_id, feed_id)
                                    )
                                );

  return existingFollow.length > 0;
}

export async function unFollow(user_id: string, feed_url: string) {
    

    const feed_id = (await GetFeedByURL(feed_url)).id;

    if (!feed_id) throw new Error("Feed not found");
       
    const countDeleted = await db.delete(feedFollows).where(and(eq(feedFollows.user_id, user_id), eq(feedFollows.feed_id, feed_id)));

    return countDeleted.count;
}