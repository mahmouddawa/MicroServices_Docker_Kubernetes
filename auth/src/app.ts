import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { curretnUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import {errorHandler , NotFoundError} from '@moudtickets/common';


const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(curretnUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res)=> {
  // I used the package express-async-errors to make the async works 
  throw new NotFoundError();
})

app.use(errorHandler);

export {app};