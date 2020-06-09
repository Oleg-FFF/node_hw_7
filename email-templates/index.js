const {emailActionsEnum} = require('../constants')

module.exports = {
    [emailActionsEnum.USER_REGISTER]: {
        subject: '[BEST SHOP] Welcome',
        templateFileName: 'createUser'
    },
    [emailActionsEnum.USER_UPDATE]: {
        subject: '[BEST SHOP] Account update',
        templateFileName: 'updateUser'
    },
    [emailActionsEnum.USER_DELETE]: {
        subject: '[BEST SHOP] Account deleted',
        templateFileName: 'delUser'
    },
    [emailActionsEnum.PRODUCT_CREATE]: {
        subject: '[BEST SHOP] New product created',
        templateFileName: 'createProduct'
    },
    [emailActionsEnum.PRODUCT_UPDATE]: {
        subject: '[BEST SHOP] Product updated',
        templateFileName: 'updateProduct'
    },
    [emailActionsEnum.PRODUCT_DELETE]: {
        subject: '[BEST SHOP] Product deleted',
        templateFileName: 'delProduct'
    }
}
