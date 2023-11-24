import express from "express"
import { adminSingleProduct, allProductsAdmin, allproducts, createproduct, deleteProduct, singleProduct, updateproduct } from "../controllers/productcontroller.js"
import upload from "../file/upload.js"
import { isAuthAdmin, isAuthenticated } from "../middlewares/auth.js"
const router = express.Router()

//create product
router.post("/create/product",isAuthenticated, isAuthAdmin, upload.single("productimage"), createproduct)

router.get("/all/products",allproducts)   //get all products

router.get("/single/product/:id",singleProduct)    //get single product

router.put("/product/update/:id",isAuthenticated, isAuthAdmin,updateproduct)  //update


router.delete("/delete/product/:id",isAuthenticated, isAuthAdmin,deleteProduct) //delete

//admin get all product 

router.route("/all/admin/products").get(isAuthenticated,isAuthAdmin,allProductsAdmin)

//get single product admin

router.route("/single/admin/product/:id").get(isAuthenticated,isAuthAdmin,adminSingleProduct)




export default router