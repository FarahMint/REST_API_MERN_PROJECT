/** https://github.com/hapijs/joi
=> use validateParam in routes/users(not in controller) we write middleware to check all validation
- > schema = schema we want to test again
- > name = name of the param we want to check against schema
  */
 const Joi = require('@hapi/joi');

/** {param:req["params"][] } explained
- param : generic -> is going to be request
- we want to access the params property inside it
*****req:{ <--  req = object <- param:req
    params:{  <-- params = 2nd obj inside of it -> req["params"]
        userId: .... <- val we want to get(...)
    }        userId = name in [] -> req["params"][]
    }***********
(req is an object & that obj has params like a 2nd obj inside of it)
- -> so we want to access that obj
- then acces name provided in validateParam:(schema,name)
==> param:req["params"][name] => req.params.userId
 ex --   name="userId"
 */

module.exports = {
    validateParam: (schema, name)=>{
        return(req, res, next)=>{
            // console.log("req.params", req.params);
             const result = Joi.validate({param:req["params"][name] }, schema); 
             if(result.error){
                 //error happened
                 return res.status(400).json(result.error);
             }else{
                 // send to controller
                 if(!req.value){
                    //If obj does not exist so create empty obj
                    req.value={};
                 }
                 if(!req.value["params"]){
                    //obj does not contains params so assign empty obj 
                    req.value["params"]={};
                 }
                    req.value["params"][name]= result.value.param;
                    next();  
             }
        }
    },
    validateBody: schema=>{
        return(req, res, next)=>{
                const result = Joi.validate(req.body, schema); 

                if(result.error){
                 //error happened
                 return res.status(400).json(result.error);       
                }
                else{
                  // send to controller
                 if(!req.value){
                    //obj does not exist so create empty obj
                    req.value={};
                 }
                 if(!req.value["body"]){
                    //obj does not contains body so assign empty obj 
                    req.value["body"]={};
                 }
                    // append to sub obj body the val store in result
                    req.value["body"]= result.value;
                       next();
            }
        }
    },

    schemas:{
        userSchema:Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(30).required(),
            email:Joi.string().email({ minDomainSegments: 2 }).required(),
            password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        }),
    // for patch not all field are required
        userOptionalSchema:Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(30),
            email:Joi.string().email({ minDomainSegments: 2 }),
            password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        }),
        idSchema:Joi.object().keys({
            param:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        userItemSchema:Joi.object().keys({
            name: Joi.string().required(),
            quantity: Joi.number().required(),
        }),
       itemSchema:Joi.object().keys({
            name: Joi.string(),
            quantity: Joi.number(),
            creator: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        }),
       
    
    }
}
 