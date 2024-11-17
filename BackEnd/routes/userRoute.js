import express from 'express';
import { getUsers, login, SignUp } from '../controllers/userController.js';
const route = express.Router();

route.post('/signup', SignUp);
route.post('/login', login);
route.get('/getusers', getUsers);

export default route;