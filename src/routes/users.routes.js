
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import basicAuth from '../utils/auth';
import isAdmin from '../utils/isadmin';

const router = new Router();

// We use our basic auth middleware
router.use(basicAuth);

router.get('/users', (req, res) => {
    UserController.getAll(req, res);
});

router.get('/users/:id', (req, res) => {
    UserController.getUser(req, res);
});

router.post('/users', (req, res) => {
    UserController.addUser(req, res);
});

router.put('/users/:id', (req, res) => {
    UserController.updateUser(req, res);
});

router.delete('/users/:id', isAdmin, (req, res) => { 
    UserController.deleteUser(req, res); 
});

router.get('/users/:id/access_token', (req, res) => {
    UserController.generateToken(req, res);
});

export default router;