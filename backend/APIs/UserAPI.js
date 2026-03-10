//Create mini express app
import exp from 'express';
import { UserModel } from '../models/UserModel.js';

export const userApp = exp.Router()
//USER API ROUTES

//Create User
userApp.post('/users', async(req, res) => {
    //get user objfrom req
    let newUser = req.body;
    //call user doc
    let newUserDoc = await new UserModel(newUser)
    //save new user
    let user = await newUserDoc.save()
    //save new user
    res.status(201).json({message:"user created", payload:user})
});

//Read all users
userApp.get('/users', async(req, res) => {
    //read all users
    let usersList = await UserModel.find({status:true})
    //send res
    res.status(200).json({message:'users', payload:usersList})
})

//Read a User by ID
userApp.get('/users/:id', async(req, res) => {
    //get user if from url
    let uid = req.params.id
    //find user by id
    let user = await UserModel.findOne({_id:uid, status:true})
    //check user
    if(!user){
        return res.status(404).send({message:"User not found"})
    }
    //send res
    res.status(200).json({ message:"user found", payload:user})
})

//Delete a User by ID
userApp.delete('/users/:id', async(req, res) => {
    //get user if from url
    let uid = req.params.id
    //find user and change status to false
    let user = await UserModel.findByIdAndUpdate(uid,{$set:{status:false}})
    //check user
    if(!user){
        return res.status(404).send({message:"User not found"})
    }
    //send res
    res.status(200).json({message:"User removed"})
})
//Update user by ID

//Activate User(Change users status true)
userApp.patch('/users/:id', async(req, res) => {
    //get user if from url
    let uid = req.params.id
    //find user and change status to true
    let user = await UserModel.findByIdAndUpdate(uid,{$set:{status:true}},{new:true})
    //send res
    res.status(200).json({message:"User activated", payload:user})
})
//PUT & PATCH

