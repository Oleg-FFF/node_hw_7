const {requestHeadersEnum, responseStatusCodesEnum} = require('../../constants');
const {tokenMaker, checkHashPassword} = require('../../helpers');
const {ErrorHandler, Errors} = require('../../error');
const {authService, userService} = require('../../services');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler(Errors.NOT_FOUND.message, responseStatusCodesEnum.NOT_FOUND, Errors.NOT_FOUND.code));
            }

            const passCheck = await checkHashPassword(password, user.password);

            if (!passCheck) {
                return next(new ErrorHandler(Errors.NOT_VALID_USER.message, responseStatusCodesEnum.NOT_FOUND, Errors.NOT_VALID_USER.code));
            }

            const tokens = tokenMaker();

            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    },

    logoutUser: async (req, res) => {
        const accessToken = req.get(requestHeadersEnum.AUTHORIZATION);

        await authService.deleteByParams({accessToken});

        res.sendStatus(200);
    },

    refreshUser: async (req, res, next) => {
        try {
            const refreshToken = req.get(requestHeadersEnum.AUTHORIZATION);
            const userId = req.userId;
            console.log(userId);

            const user = await userService.getUserById(userId);

            if (!user) {
                return next(
                    new ErrorHandler(Errors.NOT_FOUND.message, responseStatusCodesEnum.NOT_FOUND, Errors.NOT_FOUND.code)
                )
            }

            const tokens = tokenMaker();

            await authService.deleteByParams({refreshToken});
            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    }
};
