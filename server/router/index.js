import Router from 'express';
import userController from '../controllers/user_controller.js';
import {body} from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 30}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/sendmail', userController.sendMail);

router.get('/change-pass/:link', userController.changePass);
router.get('/refresh', userController.refresh);
router.get('/profile', authMiddleware, userController.getUser);

export default router;
