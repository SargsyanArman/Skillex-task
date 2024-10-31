import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const data = await response.json();
            if (!data) {
                throw new Error('No product data found');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Unknown error occurred');
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
