
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import auth from '../utils/auth';

const router = new Router();

router.get('/users', auth, (req, res) => {
    UserController.getAll(req, res);
});

router.get('/users/:id', auth, (req, res) => {
    UserController.getUser(req, res);
});

router.post('/users', auth, (req, res) => {
    UserController.addUser(req, res);
});

router.put('/users/:id', auth, (req, res) => {
    UserController.updateUser(req, res);
});

router.delete('/users/:id', auth, (req, res) => {
    UserController.deleteUser(req, res);
});

export default router;