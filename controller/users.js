 const User = require("../models/User");
 const Item = require("../models/Item");
// https://github.com/hapijs/joi
 const Joi = require('@hapi/joi');

//  create schema
const idSchema=Joi.object().keys({
    userId:  Joi.string().regex(/^ [0-9a-zA-Z]{24}$/).required()
})

module.exports ={
 
    // root("/") -  VALIDATION DONE
    index:  async (req,res,next)=>{
        try{
            const users = await User.find({}); //<-- await this method to return before moving on
        res.status(200).json(users);
        }
        catch(err){
            next(err);
       }
    },
       // VALIDATION DONE
    newUser: async (req,res,next)=>{
        try{ 
            // console.log("req.value", req.value)
            const newUser=  new User(req.value.body) 
            const user = await  newUser.save();
            res.status(201).json(user)
            }catch(err){
            next(err);
        }   
    },
        // VALIDATION DONE
    getUser: async( req, res, next)=>{
        try{
            // find particular user - id found in route
            const {userId} = req.value.params;

            const user = await User.findById(userId);
            res.status(200).json(user);
        }catch(err){
            next(err);
        } 
    },
    // VALIDATION DONE
    replaceUser: async (req,res,next)=>{
        // https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document
        try{
            // 1rst fetch userid from route param
            const {userId} = req.value.params;
            // 2nd fetch the body
            // enfore that req.body must contains all the fields
            const newUser = req.value.body;
       const result =   await  User.findOneAndUpdate( { _id: userId }, newUser , { upsert: true, new: true },);
    //    console.log("result", result);
       res.status(200).json({success:true});
        }catch(err){
            next(err);
        }
    },
       // VALIDATION DONE
    updateUser: async (req,res,next)=>{
        try{
            // 1rst fetch userid from route param
            const {userId} = req.value.params;
            // 2nd fetch the body
              // req.body may contains any num of  fields
            const newUser = req.value.body;
            const result = await  User.findOneAndUpdate( { _id: userId }, newUser , { upsert: true, new: true },);
            //    console.log("result", result);
            res.status(200).json({success:true});
        }catch(err){
            next(err);
        }
    },
      // VALIDATION DONE
    getUserItems: async (req,res,next)=>{
        try{
        // get userID
        const {userId} = req.value.params;
         const user = await User.findById(userId).populate("items")
        //  console.log(user.items)
         res.status(200).json(user.items);
        }catch(err){
            next(err);
        }
    },
    newUserItems: async (req,res,next)=>{
        try{
    // create new items
    // console.log("req.value", req.value)
     const newItem = new Item(req.value.body);
    //getting user 
    const {userId} = req.value.params;
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
    deleteUserItem: async (req,res,next)=>{
        try{
        // get userID
        const {userId} = req.value.params;
         const user = await User.findById(userId).populate("items")
        //  console.log(user.items)
         res.status(200).json(user.items);
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