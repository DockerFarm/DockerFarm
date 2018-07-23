import Koa from 'koa';
import koaBody from 'koa-body';
import db from 'db';
import api from 'api';
import cors from '@koa/cors';
import tokenCheck from 'lib/middleware/tokenCheck';

const app = new Koa();

db.connect();
//use koa cors middleware
app.use(cors());
//use koa body parser middleware
app.use(koaBody());

app.use(tokenCheck())
    .use(api.routes())
    .use(api.allowedMethods());


export default app;