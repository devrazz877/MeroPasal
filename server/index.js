import express from "express"
//import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv"; 
import connectdb from "./config/db.js";
import productroute from "./routes/productroute.js"
import colors from "colors";
import cors from "cors"
const app = express();
import userRoute from "./routes/userRoutes.js" 
import { errorListening } from "./middlewares/error.js";


//configuration


dotenv.config()
connectdb();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

//handel uncaught error

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`.red)
    console.log(`shutting down the server to handel uncaughtexception`)
    process.exit(1)
})
app.use("/api/v1",productroute)    //routing
app.use("/api/v1",userRoute)
app.use("/gallery",express.static("public/gallery"))

//custom error handling
app.use(errorListening)

// app.get("/",(req,res)=>
// {
//     res.status(200).json({
//         name : "ram",
//         age :22,
//         ismarried :false,
//     })

//   //  res.sendFile(path.join(__dirname + "/index.html"));
// });

// app.post("/add",(req,res)=>
// {
//     const username = req.body.name
//     const useremail = req.body.email
//     const userpassword = req.body.password

//     res.status(201).json({
//         success : true,
//         name: username,
//         email: useremail,
//         password: userpassword,
//     });


// });


// app.post("/api/v1/login",(req,res)=>
// {
//     res.send("<h1>form is added </h1>");
//     console.log(req.body);
//})



// const userschema = new mongoose.Schema({

//     name: String,
//     age:Number,
//     gender:String,
//     ismarried:Boolean
// })

// const User =  new mongoose.model("user",userschema);

// //POST

// app.post("/add",async(req,res)=>
// {
//     const User = await user.create(req.body)
//     res.status(201).json(
//         {
//             success:true,
//             message:"user added scucessfully",
//             user,
//         }
//     )
// })

// // const makecollection = async()=>
// // {
// //     await user.find()
// //     console.log(user)
// // }

// // makecollection();


// //GET ALL USER


// app.get("/users",async(req,res)=>
// {
//     const users = await User.find()

//     res.status(200).json({
//         success:true,
//         message:"scucessssssssss!!!!",
//        users ,
//     })
// })


// //UPDATE USER

// app.put("/user/:id",async(req,res)=>
// {
//     let user = await User.findById(req.params.id)

//     user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})


//     res.status(200).json({
//         success: true,
//         message:"la bhayo",
//         user
//     })
// })


// //DELETE USER


// app.delete("/user/:id",async(req,res)=>
// {
//     await User.deleteOne({_id:req.params.id});
//     res.status(200).json({
//         success: true,
//         message:"la delete bhayo",
    
//     })
// })


const PORT = process.env.PORT;
const server = app.listen(PORT, ()=>
{
    console.log(`server is running at  : http://localhost:${PORT}`.cyan.underline.bold);
});

//handel promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`.red)
    console.log(`shutting down the server to handel promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
})






