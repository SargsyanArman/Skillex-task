import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products, handleOpen }) => {
    return (
        <Grid container spacing={3} justifyContent="center" marginTop={2}>
            {products.length === 0 ? (
                <Typography variant="h4" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
                    No Products Found
                </Typography>
            ) : (
                products.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={item} handleOpen={handleOpen} />
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default ProductList;
