import { User } from "./feedsHelper";
import { getPostsForUser } from "./lib/db/queries/Posts";





export async function handlerBrowse(cmdName: string, user: User, ...args: string[]) {
    
    const parsed = Number(args[0]);
  const limit = isNaN(parsed) ? 2 : parsed;

    const posts = await getPostsForUser(user.id, limit);

    console.log(posts.length);

    posts.forEach(p => {
        console.log(p.title);
    });
}