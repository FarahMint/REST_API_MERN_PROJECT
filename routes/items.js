const express= require("express");
const router= express.Router();

const ItemsController =  require("../controller/items");

const {validateParam, schemas, validateBody} = require("../helpers/routeHelpers") ;

router.route("/")
.get(ItemsController.index) 
.post(validateBody(schemas.itemSchema), ItemsController.newItem)

router.route("/:itemId")
.get(  validateParam(schemas.idSchema, "itemId"), ItemsController.getItem) 
.patch(
     [
    validateParam(schemas.idSchema, "itemId"),
  validateBody(schemas.itemSchema)
   ],
    ItemsController.updateItem)
.delete( validateParam(schemas.idSchema, "itemId") , ItemsController.deleteItem)

module.exports = router;


 