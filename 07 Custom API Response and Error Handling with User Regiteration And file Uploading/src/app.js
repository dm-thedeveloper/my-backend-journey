import express from 'express';
import CORS from 'cors';

const app = express();

app.use(CORS());

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static('public'));


// import Routes

import { router } from './Routes/user.route.js';

// router Declaration 

// app.use('/user',userRoute)

app.use('/user', router);

export {app} 