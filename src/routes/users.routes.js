
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import auth from '../utils/auth';

const router = new Router();

// We use our basic auth middleware
router.use(auth);

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

router.delete('/users/:id', (req, res) => {
    UserController.deleteUser(req, res);
});

router.get('/users/:id/access_token', (req, res) => {
    UserController.generateToken(req, res);
});

export default router;