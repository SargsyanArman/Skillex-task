import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products, handleOpen }) => {
    return (
        <Grid container spacing={3} justifyContent="center" marginTop={2}>
            {products.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={item} handleOpen={handleOpen} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
