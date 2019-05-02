 const User = require("../models/User");
 const Item = require("../models/Item");
// https://github.com/hapijs/joi
 const Joi = require('@hapi/joi');

//  create schema
const idSchema=Joi.object().keys({
    userId:  Joi.string().regex(/^ [0-9a-zA-Z]{24}$/).required()
})

module.exports ={

    // root("/")
    index:  async (req,res,next)=>{
        try{
            const users = await User.find({}); //<-- await this method to return before moving on
        res.status(200).json(users);
        }
        catch(err){
            next(err);
       }
    },
    newUser: async (req,res,next)=>{
        try{ 
            const newUser=  new User(req.body) 
            const user = await  newUser.save();
            res.status(201).json(user)
            }catch(err){
            next(err);
        }   
    },
    getUser: async( req, res, next)=>{
        try{
            // test joi - Return result.
        const result = Joi.validate(req.params, idSchema);
        // console.log(`result`, result)
            // find particular user - id found in route
            const {userId} = req.params;
            const user = await User.findById(result.value.userId);
            res.status(200).json(user);
        }catch(err){
            next(err);
        } 
    },
    replaceUser: async (req,res,next)=>{
        // https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
        try{

            // 1rst fetch userid from route param
            const {userId} = req.params;
            // 2nd fetch the body
            // enfore that req.body must contains all the fields
            const newUser = req.body;
       const result =   await  User.findOneAndUpdate( { _id: userId }, newUser , { upsert: true, new: true },);
    //    console.log("result", result);
       res.status(200).json({success:true});
        }catch(err){
            next(err);
        }
    },
    updateUser: async (req,res,next)=>{
        try{
            // 1rst fetch userid from route param
            const {userId} = req.params;
            // 2nd fetch the body
              // req.body may contains any num of  fields
            const newUser = req.body;
            const result = await  User.findOneAndUpdate( { _id: userId }, newUser , { upsert: true, new: true },);
            //    console.log("result", result);
            res.status(200).json({success:true});
        }catch(err){
            next(err);
        }
    },
    getUserItems: async (req,res,next)=>{
        try{
        // get userID
        const {userId} = req.params;
         const user = await User.findById(userId).populate("items")
         console.log(user.items)
         res.status(200).json(user.items);
        }catch(err){
            next(err);
        }
    },
    newUserItems: async (req,res,next)=>{
        try{
    // create new items
     const newItem = new Item(req.body);
    //getting user 
    const {userId} = req.params;
     const user= await User.findById(userId);
    // assign user as item creator
    newItem.creator =user;
    // save the item 
    await newItem.save();
    // add item to user items  array
    user.items.push(newItem);
       // save the user
       await user.save();
     res.status(201).json( newItem );
        }catch(err){
            next(err);
        }
    },


}

/**
 * we can interact in 3 different way
 * 
 * 1- via callback
 * 2-via Promises
 * *- vias async await(promises)
 */