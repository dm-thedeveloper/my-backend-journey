import { Router } from 'express';
import {upload} from '../Middlewares/multer.middleware.js'; // Import multer middleware
import { RegisterUser } from '../controller/user.controller.js';

const Register = Router();

// POST route for registering a user with file upload

Register.post('/Register', upload.fields([{name:"profile",maxCount:1}]),RegisterUser);

export  {Register};
