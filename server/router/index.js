import Router from 'express';
import userController from '../controllers/user_controller.js';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/profile', userController.getUser);

export default router;
