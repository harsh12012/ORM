const User =require('../models/User');
const Order = require('../models/Order')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

const userController ={
    async register(req,res){
        try {
            const {username, email, password} =req.body;
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });
            await newUser.save()
            const token = token.sign({id:newUser._id},'yourSecretKey',{expiresIn:'1h'})
            res.json({message:'user is created',token})

        } catch (error) {
            console.error(error);
        }
    },
    async login(req, res ){
        try {
            const {email,password} =req.body;
            const user = await User.findOne({email})
            if(!user){
                return res.status(404).json({message:'user not found'})
            }
            const isPasswordValid = await bcrypt.compare(password,user.password)
            if(!isPasswordValid){
                return res.status(401).json({message:'invalid Password'})
            }
            const token = token.sign({id:newUser._id},'yourSecretKey',{expiresIn:'1h'})
            res.json({message:'Login Successfully',token})


        } catch (error) {
            console.error(error)            
        }

    },
    async getAllUsers(req,res){
        try {
            const users = await User.find().populate('orders');
            res.json(users)
        } catch (error) {
            console.error(error)
        }
        
    },
    async getUserById(req,res){
        try {
            const users = await User.findById(req.params._id).populate('orders');
            res.json(users)
            
        } catch (error) {
            console.error(error)
        }
    },
    async updateUser(req, res){
        try{
            const {username , email} = req.body;
            await User.findByIdAndUpdate(req.params._id,{username,email});
            res.json({message:'User update successfully'})
        }
        catch (error) {
            console.error(error)
        }
    },
    async deleteUser(req, res){
        try{
            await User.findByIdAndDelete(req.params._id);
            res.json({message:'User Delete successfully'})
        }
        catch (error) {
            console.error(error)
        }
    },
    async createOrder(req,res){
        try {
            const {userId, totalAmount} = req.body
            const newOrder = new Order({
                userId,
                totalAmount
            });
            await newOrder.save()
            const user = await User.findByIdAndUpdate(userId,{$push:{orders:newOrder._id}},{new:true})
            res.json({message:'order created sucessfully',user})
        } catch (error) {
            console.error(error)
        }
    },
    async getOrderByUserId(req,res){
        try {
            const orders = await Order.find({userId:req.params.userId});
            res,json(orders)
        } catch (error) {
            console.error(error)
        }
    },
    async getOrderById(req,res){
        try {
            const orders = await Order.findById(req.params.id)
            res.json(orders)
        } catch (error) {
            console.error(error)
        }
    },
    async updateOrder(req,res){
        try {
            const {totalAmount} =req.body;
            await Order.findByIdAndUpdate(req.params.id,{totalAmount})
            res.json({message:'order updated succesfully'})
        } catch (error) {
            console.error(error)
        }
    },
    async deleteOrder(req,res){
        try {
            const {totalAmount} =req.body;
            await Order.findByIdAndDelete(req.params.id,)
            res.json({message:'order deleted succesfully'})
        } catch (error) {
            console.error(error)
        }
    },
};
async function getTotalRevenue(req,res){
    const getTotalRevenueResult = await Order.aggregate([
        {
            $group:{
                _id:null,
                totalRevenue:{$sum:'$totalAmount'}
            }
        }
    ])
    const totalRevenue = getTotalRevenueResult>0?getTotalRevenueResult[0].totalRevenue:0
    res.json({totalRevenue})
}

module.exports = {userController,
getTotalRevenue};
