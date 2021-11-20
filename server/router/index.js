import Router from 'express';
import userController from '../controllers/user_controller.js';
import {body} from 'express-validator';

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 30}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/profile', userController.getUser);

export default router;
