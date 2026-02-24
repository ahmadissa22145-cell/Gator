import { db } from "../index";
import {users} from "../schema";
import { eq,Name,sql } from "drizzle-orm";


export async function createUser(name: string) {
    
    try{
        const [result] = await db.insert(users)
                                 .values({name: name})
                                 .returning();
        return result;
    }catch{
         throw new Error("User already exists");
    }

    
}

export async function getUserByName(name: string){

    const [result] = await db.select()
                        .from(users)
                        .where(eq(users.name , name));

    return result                        
}

export async function getUserByID(id: string){

    const [result] = await db.select()
                        .from(users)
                        .where(eq(users.id , id));

    return result                        
}

export async function Reset() {
    
    try{

        await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);

        console.log("Reset successful");

    }catch(err){
        throw err;
    }
}

export async function GetAllUsers() {
    
    try{

        const result = await db.select().from(users);

        return result;
    }catch(err){
        throw err;
    }
}