import express from 'express';
import { userRouter } from './router/user.router';
import { eventTypeRouter } from './router/event-type.router';
import { publicEventRouter } from './router/public-event.router';
import { errorHandler } from './middlewares/error-handlers';
import { routeNotFound } from './middlewares/route-not-found';

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());


// custom routes
app.get('/health', (_req, res)=>{
    res.json({
        status:'ok!',
        timeStamp: new Date().toISOString()
    })
})
// express router based routes
app.use("/user",userRouter);
app.use("/event-types",eventTypeRouter);
app.use("/public/event-types",publicEventRouter);
app.use(routeNotFound)
app.use(errorHandler)
export {app};