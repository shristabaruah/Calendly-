import {app} from "./app.js";
import { connectDatabase } from "./config/database.js";
import {PORT} from "./config/env.js";
import { findAllUsers } from "./services/user.service.js";


async function startServer(){
    await connectDatabase();
    app.listen(PORT,async()=>{
        console.log(`Server is running on port ${PORT}`)
      
    });
}

startServer().catch((error)=>{
    console.error("Error starting server:", error);
    process.exit(1);
});

