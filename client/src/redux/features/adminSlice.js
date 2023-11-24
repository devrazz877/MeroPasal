import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../apiRoute/api";


//add product admin

export const createProduct = createAsyncThunk(
  "/add/product",
  async ({formData,toast,navigate}, { rejectWithValue }) => {
    try {
      const response = await api.addProduct(formData);
      toast.success(response.data.message) || "product added scucessfully"
      navigate("/admin/meropasal-dashboard/panel") 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//delete product

export const productDelete = createAsyncThunk(
  "/delete/product",
  async ({id,toast}, { rejectWithValue,dispatch }) => {
    try {
      const response = await api.deleteProduct(id);
      dispatch(productsAdmin())
      toast.success(response.data.message) || "product deleted scucessfully"
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



//get all admin products

export const productsAdmin = createAsyncThunk(
  "/admin/products",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.getAdminProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: "",
    error: "",
    message: "",
    adminProduct: [],
    adminProducts:{},
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(productsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProduct = action.payload.data;
      })
      .addCase(productsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createProduct.pending,(state)=>{
        state.loading = true
      })
      .addCase(createProduct.fulfilled,(state,action)=>{
        state.loading = false
        state.adminProducts = action.payload
      })
      .addCase(createProduct.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(productDelete.pending,(state)=>{
        state.loading = true
      })
      .addCase(productDelete.fulfilled,(state,action)=>{
        state.loading = false
        state.adminProducts = action.payload
      })
      .addCase(productDelete.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload.message
      })
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
