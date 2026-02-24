import { User } from "./feedsHelper";

export type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

