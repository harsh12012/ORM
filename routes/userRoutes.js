const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/Users',userController.getAllUsers)
router.get('/Users/:id',userController.getOrderByUserId)
router.put('/Users/:id',userController.updateUser)
router.delete('/Users/:id',userController.deleteUser)

router.get('/orders',userController.createOrder)
router.get('/orders/:userId',userController.getOrderByUserId)
router.get('/orders/:id',userController.getOrderById)
router.put('/orders/:id',userController.updateOrder)
router.delete('/orders/:id',userController.deleteOrder)

router.get('/total-revenue',userController.getTotalRevenue)

module.exports = router;
