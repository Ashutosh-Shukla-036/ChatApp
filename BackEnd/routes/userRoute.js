import express from 'express';
import { login, SignUp } from '../controllers/userController.js';
const route = express.Router();

route.post('/signup', SignUp);
route.get('/login', login);

export default route;