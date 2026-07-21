import express from 'express';
import { timeStamp } from 'node:console';

const app = express();

app.get('/health', (_req, res)=>{
    res.json({
        status:'ok!',
        timeStamp: new Date().toISOString()
    })
})

export {app};