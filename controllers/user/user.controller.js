const {emailActionsEnum} = require('../../constants')
const {emailService, userService} = require('../../services')
const {hashPassword, checkHashPassword} = require('../../helpers')
const ErrorHandler = require('../../error/ErrorHandler')

module.exports = {
    getAllUsers: async (req, res) => {
        let users = await userService.getUsers();

        res.json(users)
    },

    getUserByParams: async (req, res) => {
        let params = req.params;
        let user = await userService.getUserByParams(params);

        res.json({user})
    },

    updateUser: async (req, res) => {
        const data = req.body;
        const params = +req.params.name;
        const oldUserInfo = await userService.getUserById(params);
        const updUser = await userService.updateUser(params, data);
        const newUserInfo = await userService.getUserById(params);

        await emailService.sendMail(
            oldUserInfo.email,
            emailActionsEnum.USER_UPDATE,
            {oldUserName: oldUserInfo.name, userName: newUserInfo.name, userEmail: newUserInfo.email}
        )

        res.json({updUser})

    },

    deleteUser: async (req, res) => {
        const userId = +req.params.id;
        const user = await userService.getUserById(userId);
        let deletedUser = await userService.deleteUser(userId);

        await emailService.sendMail(
            user.email,
            emailActionsEnum.USER_DELETE,
            {userName: user.name, userEmail: user.email}
        )

        res.json({deletedUser})
    },

    createUser: async (req, res) => {
        try {
            const user = req.body;
            const hashedPassword = await hashPassword(user.password);

            user.password = hashedPassword;

            let newUser = await userService.createUser(user);

            await emailService.sendMail(
                user.email,
                emailActionsEnum.USER_REGISTER,
                {userName: user.name, userEmail: user.email}
            )

            return res.json({newUser})
        } catch (e) {
            res.json(e)
        }
        res.end()
    },

    loginUser: async (req, res, next) => {

        const {email, password} = req.body;
        const user = await userService.getUserByParams({email});

        if (!user) {
            return next(new ErrorHandler('User is not found', 404, 4041));
        }

        await checkHashPassword(user.password, password);

        res.json(user);
    }
};
