import express from 'express';
import AuthController from '../controllers/Auth.js';
const { Register, Logout, Login } = AuthController;
const AuthRoutes = express.Router();

AuthRoutes.post('/register',Register);
AuthRoutes.post('/login',Login);
AuthRoutes.post('/logout',Logout);

export default AuthRoutes;



