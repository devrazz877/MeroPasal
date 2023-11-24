import { response } from "express";
import User from "../models/userModel.js";
import path from "path"
import {join} from "path"
import fs from "fs"
import { unlink } from "fs/promises";
import ErrorHandler from "../utilis/errorHandler.js";
import { tryCatchAsyncError } from "../middlewares/tryCatchAsyncErrors.js";


//register

export const register = tryCatchAsyncError(async(req,res,next)=>
    {
    
        const{fullName,email,mobileNo,password}=req.body;
        if(!fullName||!email||!mobileNo||!password) return next(new ErrorHandler("please provide req feilds",400))
        
           
        
        if(!/\S+@\S+\.\S+/.test(email)) return next(new ErrorHandler("email must be valid",400))
        
        const exists = await User.findOne({email})
        if(exists) return next(new ErrorHandler("email already exists",400))
       
    
    const user = await User.create
    ({
        fullName,
        email,
        mobileNo,
        password,
    })

    res.status(201).json
    ({
        success:true,
        message:"registration completed",
        user
    })
}
)


// export const register = tryCatchAsyncError(async (req, res, next) => {
//     const { fullName, email, mobileNo, password } = req.body;
//     if (!fullName || !email || !mobileNo || !password)
//       return next(new ErrorHandler("please provide required fields", 400));
//     if (!/\S+@\S+\.\S+/.test(email))
//       return next(new ErrorHandler("email must be valid", 400));
//     const exists = await User.findOne({ email });
//     if (exists) return next(new ErrorHandler("email already exists", 400));
//     const user = await User.create({
//       fullName,
//       email,
//       mobileNo,
//       password,
//     });
//     res.status(201).json({
//       success: true,
//       message: "register successFully!",
//       user,
//     });
//   });


     


//login

export const login = tryCatchAsyncError(
    async(req,res,next)=>{
    
            const{email,password}=req.body
            if(!email || !password) return next(new ErrorHandler("pls provide req feilds",400))
            
        
            if(!/\S+@\S+\.\S+/.test(email)) return next(new ErrorHandler("email must be valid",400))
            
            const user = await User.findOne({email}).select("+password");
            
            if(!user) return next(new ErrorHandler("email doesnot exist",400))
           

            const isMatched = await user.comparePassword(password)
        if(!isMatched) return next(new ErrorHandler("password doesnot match",400))
        
        const token = user.getJwtToken()

    
        res.status(200).json({
            success:true,
            message:"login scucessfully",
            user,
            token

        })
    }
)

        

      


//Logged In User(profile/information)
export const LoggedInUser =  tryCatchAsyncError(async(req,res) =>{
    
        const user = await User.findById(req.user.id)
        if(!user) return next(new ErrorHandler("user not found",400))
        
        res.status(200).json({
            success : true,
            message: "User Fetched Succesfully",
           data : user,
        })
        
    } )


//Update Profile
export const updateProfile = tryCatchAsyncError(async(req,res,next) =>{
    

        const user = await User.findById(req.user.id)
        if(!user) return next(new ErrorHandler("user not found",400))
          
        const {fullName} = req.body
        if(!fullName){
            if(req.file){
                await unlink(req.file.path)
            }
            return res.status(400).json({
                success: false,
                message: "Field must be filled!"
            })
        } 

        const existingImageURL = user.avatar.url;
        const baseurl = `${req.protocol}://${req.hostname}:${process.env.PORT||4000}`
        const avatarPath = req.file.filename
        let avatarImageURL

        if(existingImageURL){
            const filename = path.basename(existingImageURL)
            const previousAvatarPath = path.join("public", "gallery", filename)
            fs.unlinkSync(previousAvatarPath)
        }

        if(avatarPath){
            avatarImageURL = `${baseurl}/gallery/${avatarPath}`.replace(/\\/g,"/")
        }

        user.fullName = fullName
        user.avatar = avatarImageURL?{url:avatarImageURL}:undefined
        await user.save()
        res.status(200).json({
            success:true,
            message: "Profile Updated Sucessfully",
            data:user,
        })
        
    } )

//change password

export const changePassword = tryCatchAsyncError( async(req,res,next)=>
{
    
        const user = await User.findById(req.user.id).select("+password");
        if(!user) return next(new ErrorHandler("user not found",400))
           

        const{oldPassword,newPassword,confirmPassword} = req.body
        if(!oldPassword || !newPassword) return next(new ErrorHandler("password doesnt match",400))
        
        if(newPassword !== confirmPassword) return next(new ErrorHandler("crediantial error",400))
        
        const isMatched = await user.comparePassword(oldPassword)
        if(!isMatched) return next(new ErrorHandler("incorrect password",400))
           

        user.password = newPassword
        await user.save();
        res.status(200).json({
            success:true,
            message:"password changed scucessfullyyyy"
        })
        
    } )


