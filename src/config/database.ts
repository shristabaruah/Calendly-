import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "./env.js";

const adapter = new PrismaPg({
    connectionString:DATABASE_URL
})
export const prismaClient = new PrismaClient({adapter});

export async function connectDatabase(){
    try{
        await prismaClient.$connect();
        console.log("Database connected!");
    }
    catch(error:any){
        console.error("Error connecting to database:", error);
        process.exit(1);  // Exit with failure code
    }   
}