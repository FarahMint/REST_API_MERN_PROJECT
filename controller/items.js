 const User = require("../models/User");
 const Item = require("../models/Item");
// https://github.com/hapijs/joi
 const Joi = require('@hapi/joi');

module.exports ={
    // root("/") -  VALIDATION DONE
    index:  async (req,res,next)=>{
        try{
            // get all the items
            const items = await Item.find({}); //<-- await method to return before moving on
            res.status(200).json(items);
            }
        catch(err){
            next(err);
       }
    },
    getItem: async( req, res, next)=>{
        try{
            // find particular user - id found in route
            const {itemId} = req.value.params;

            const item = await Item.findById(itemId);
            res.status(200).json(item);
        }catch(err){
            next(err);
        } 
    },

    newItem:  async (req,res,next)=>{
        // 1. find user
            // - userid save in body of req
          const creator = await User.findById(req.value.body.creator)
        
        // 2. create new item
        const newItem = req.value.body;
        // delete newItem.creator; // ? not sure

        const item = new Item(newItem );
        await item.save();

        // 3. add newly created item to the creator - actual user loggedin

    // add item to user items  array
   creator.items.push(item);
  await creator.save();

    res.status(200).json(item);
      
    },
        updateItem: async (req,res,next)=>{
        try{
            // 1rst fetch userid from route param
            const {itemId} = req.value.params;
            // 2nd fetch the body
              // req.body may contains any num of  fields
            const newItem = req.value.body;
            const result = await  Item.findOneAndUpdate( { _id: itemId }, newItem , { upsert: true, new: true },);
            //    console.log("result", result);
            res.status(200).json({success:true});
        }catch(err){
            next(err);
        }
    },
 
        deleteItem: async (req,res,next)=>{
        try{
    const {itemId} = req.value.params;
        //    get ref to item
    const item = await Item.findById(itemId);
    // console.log("item", item);

    if(!item) return  res.status(404).json({error: "item does not exist"})

        // get ref to creator
const creatorId = item.creator;
const user = await User.findById(creatorId);

//  remove the item
await item.remove();

// remove item from the user items list
user.items.pull(item );
await user.save();
  res.status(200).json({success:true});
         
        }catch(err){
            next(err);
        }
    },
 
 
 
 


}

 