import axios from "axios"

const baseUrl = "http://localhost:4000/api/v1"

const API = axios.create({
    baseURL : baseUrl,
})

//Interceptors(for authorization)

API.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token")
    try {
        if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
        
    } catch (error) {
        console.log(error)
        
    }
    return req
})

//user register

export const userRegister = (formData)=> API.post("/register",formData)

//get all products

export const getAllProducts = ()=> API.get("/all/products")

//get single product 

export const getSingleProduct = (id)=> API.get(`/single/product/${id}`)

//user login

export const userLogin = (loginValue) => API.post("/login",loginValue)

//get profile

export const userProfile = () => API.get("/single/user")

//change password

export const passwordUpdate = ()=>API.put("/change/password")

//updateProfile

export const updateProfile = (updateForm)=> API.put("/update/user",updateForm)


//admin all products

export const getAdminProducts = ()=>API.get("/all/admin/products")

//add product(admin)

export const addProduct = (formData)=>API.post("/create/product",formData)

//delete product

export const deleteProduct = (id)=>API.delete(`/delete/product/${id}`)
