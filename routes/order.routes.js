const controller = require('../controllers/order.controller');
const route = require('express').Router();
const verifyToken = require('../middlewares');

route.post('/', verifyToken, controller.create);
// route.get('/', controller.findAll);
// route.get('/:id', controller.findOne);
// route.put('/:id', controller.update);
// route.delete('/:id', controller.delete);

module.exports = route;