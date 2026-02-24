import { feeds } from "./lib/db/schema";
import { users } from "./lib/db/schema";


export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;


export function printFeed(feed: Feed, user: User){

 
  console.log(`ID: ${feed.id}`);
  console.log(`Name: ${feed.name}`);
  console.log(`URL: ${feed.url}`);
  console.log(`User: ${user.name}`);

}