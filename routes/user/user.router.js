const {Router} = require('express');
const userRouter = Router();

const {userController} = require('../../controllers')
const {checkUser} = require('../../middlewares')
const {checkAccessToken} = require('../../middlewares')


userRouter.post('/',
    checkUser,
    userController.createUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:name', userController.getUserByParams);

userRouter.delete('/:id', userController.deleteUser);

userRouter.put('/:name', userController.updateUser)

// userRouter.get('/profile', authMiddleware.checkAccessToken, userController.getUserProfile)

module.exports = userRouter;
