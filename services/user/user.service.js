const db = require('../../dataBase').getInstance();
const {USER} = require('../../constants/modelNames.enum');


module.exports = {
    getUsers: () => {
        const UserModel = db.getModel(USER);

        return UserModel.findAll({})
    },

    getUserByParams: (params) => {
        const UserModel = db.getModel(USER);

        return UserModel.findOne({
            where: params
        })
    },

    updateUser: (userId, user) => {
        const UserModel = db.getModel(USER);

        return UserModel.update(user, {
            where: {
                id: userId
            }
        });

    },

    getUserById: (id) => {
        const UserModel = db.getModel(USER);

        return UserModel.findByPk(id)
    },

    createUser: (user) => {
        const UserModel = db.getModel(USER);

        return UserModel.create(user)
    },

    deleteUser: (id) => {
        const UserModel = db.getModel(USER);

        return UserModel.destroy({
            where: {
                id
            }
        });
    }

};
