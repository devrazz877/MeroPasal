import product from "../models/productModels.js";
import path from "path";
import { join } from "path";
import fs from "fs";
import { unlink } from "fs/promises";
import { tryCatchAsyncError } from "../middlewares/tryCatchAsyncErrors.js";
import ErrorHandler from "../utilis/errorHandler.js";
import ApiFeatures from "../helpers/apiFeatures.js";


export const createproduct = tryCatchAsyncError(
  async (
    req,
    res,
    next //create product
  ) => {
    const {
      productname,
      description,
      price,
      manufacture,
      ratings,
      category,
      isinstock,
      SKU,
    } = req.body;
    console.log(req.body);
    if (
      !productname ||
      !description ||
      !category ||
      !price ||
      !manufacture ||
      !ratings ||
      !isinstock ||
      !SKU
    ) {
      if (req.file) {
        await unlink(req.file.path);
      }
      return next(new ErrorHandler("field must be filled!",400))
    }

    const baseurl = `${req.protocol}://${req.hostname}:${
      process.env.PORT || 4000
    }`;
    let imagepath = req.file.filename;
    let productimageurl;

    if (imagepath) {
      productimageurl = `${baseurl}/gallery/${imagepath}`.replace(/\\/g,"/")
    }
    
    const Product = await product.create({
      productname,
      description,
      price,
      manufacture,
      ratings,
      SKU,
      category,
      isinstock,
      productimage: productimageurl ? { url: productimageurl } : undefined,
    });

    res.status(201).json({
      success: true,
      message: "product created scucessfully",
      Product,
    });
  }
);

//find methods

export const allproducts = tryCatchAsyncError(async (req, res, next) => {
  const resultPerPage = 12
  const countDocument = await product.countDocuments()
  const apifeature = new ApiFeatures(product.find(),req.query).search().filter().pagination(resultPerPage)
  const products = await apifeature.query
  res.status(200).json({
    success: true,
    message: "product get scucessfully",
    products,
    countDocument
  });
});

//get single product

export const singleProduct = tryCatchAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  const Product = await product.findById(productId);
  if (!Product) return next(new ErrorHandler("product not found", 400));

  res.status(200).json({
    success:true,
    message:"product get successFully!",
    data:Product,
   
  })
});

//update procuct

export const updateproduct = tryCatchAsyncError(async (req, res, next) => {
  const productid = req.params.id;
  let dev = await product.findById(productid);
  if (!dev) {
    if (req.file) {
      await unlink(req.file.path);
    }
    return next(new ErrorHandler("product not found!",404))
  }

  const {
    productname,
    description,
    category,
    price,
    isinstock,
    SKU,
    manufacture,
    ratings,
  } = req.body;

  if (
    !productname ||
    !description ||
    !category ||
    !price ||
    !manufacture ||
    !isinstock ||
    !SKU
  ) {
    if (req.file) {
      await unlink(req.file.path);
    }
    return next(new ErrorHandler("filed must be filled!",400))
  }

  const existingimageuRL = dev.productimage.url;
  const baseurl = `${req.protocol}://${req.hostname}:${
    process.env.PORT || 4000
  }`;
  let imagePath = req.file.filename;
  let productimageuRL;
  if (existingimageuRL) {
    const filename = path.basename(existingimageuRL);
    const previousimagepath = path.join("public", "gallery", filename);
    fs.unlinkSync(previousimagepath);

    if (imagePath) {
      productimageuRL = `${baseurl}/gallery/${imagePath}`.replace(/\\/g,"/")
    }

    dev.productname = productname;
    dev.description = description;
    dev.ratings = ratings;
    dev.manufacture = manufacture;
    dev.isinstock = isinstock;
    dev.price = price;
    dev.price = SKU;
    dev.productimage = productimageuRL ? { url: productimageuRL } : undefined;

    await dev.save();
    res.status(200).json({
      success: true,
      message: "product updated",
      dev,
    });
  }
})

//delete product

export const deleteProduct = tryCatchAsyncError(async (req, res) => {
  const productId = req.params.id;
  const Product = await product.findById(productId);
  if (!Product) return next(new ErrorHandler("product not found ", 404));

  const existingImageURL = Product.productimage.url;
  if (existingImageURL) {
    const filename = path.basename(existingImageURL);
    const previousImagePath = path.join("public", "gallery", filename);
    fs.unlinkSync(previousImagePath);
  }
  await Product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted Sucessfully",
    Product,
  });
});

//get all product by admin

export const allProductsAdmin = tryCatchAsyncError(async(req,res,next)=>{
  const products = await product.find()
  if(!products) return next(new ErrorHandler("product not found" ,404))

  res.status(200).json({
    success:true,
    message:"all data fetched scucessfully!",
    data:products,
  })
})

//get single product by admin

export const adminSingleProduct = tryCatchAsyncError(async(req,res,next)=>{
  const Product = await product.findById(req.params.id)
  if(!Product) return next(new ErrorHandler("product not found",404))

  res.status(200).json({
    success:true,
    message:"data fetched successfully",
    data:Product
  })
})
