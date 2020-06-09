const {Router} = require('express');

const productRouter = Router();

const {productController} = require('../../controllers');
const {checkProduct, checkAccessToken} = require('../../middlewares');


productRouter.post('/', checkProduct, checkAccessToken, productController.createProduct);

productRouter.get('/', productController.getAllProducts);

productRouter.get('/:id', productController.getProduct);

productRouter.post('/sale/:id', productController.getDiscount);

productRouter.put('/:id', checkProduct, checkAccessToken, productController.updateProduct);

productRouter.delete('/:id', checkAccessToken, productController.deleteProduct);


module.exports = productRouter;
