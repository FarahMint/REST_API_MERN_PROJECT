const express= require("express");
const router= express.Router();

const UsersController =  require("../controller/users");

// const validateParam = require("../helpers/routeHelpers").validateParam;

const {validateParam, schemas, validateBody} = require("../helpers/routeHelpers") ;


router.route("/")
.get( UsersController.index) 
.post(validateBody(schemas.userSchema),UsersController.newUser)

/* users/:id
* when this req get hit 
- 1rst execute validateParam func 
- & if everything is correct
- continue & execUsersController.getUser */

router.route("/:userId")
.get(validateParam(schemas.idSchema, "userId"),UsersController.getUser) 
.put([validateParam(schemas.idSchema, "userId"), validateBody(schemas.userSchema)],UsersController.replaceUser)
.patch(
    [validateParam(schemas.idSchema, "userId"), validateBody(schemas.userOptionalSchema)],
    UsersController.updateUser)

// /users/:id
router.route("/:userId/items")
.get( validateParam(schemas.idSchema, "userId"),UsersController.getUserItems) 
.post(
   [
    validateParam(schemas.idSchema, "userId"),
  validateBody(schemas.userItemSchema)
   ],
    UsersController.newUserItems)



module.exports = router;


 