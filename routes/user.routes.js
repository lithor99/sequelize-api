const controller = require('../controllers/user.controller');
const route = require('express').Router();
const verifyToken = require('../middlewares');

route.post('/', controller.create);
route.post('/login', controller.login);
route.get('/', verifyToken, controller.findAll);
route.get('/:id', controller.findOne);
route.put('/:id', controller.update);
route.delete('/:id', controller.delete);

module.exports = route;