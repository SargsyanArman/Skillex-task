import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../Store/Slices/ProductSlice";
import { Card, CardContent, CardMedia, Typography, CircularProgress, Grid } from "@mui/material";

function Products() {
    const dispatch = useDispatch();
    const { product, status, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    if (status === "loading") return <CircularProgress />;
    if (status === "failed") return <p>Error: {error}</p>;
    // console.log(product[0].rating.rate);

    return (
        <Grid container spacing={3} justifyContent="center" marginTop={2}>
            {product && product.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ maxWidth: 345, boxShadow: 3, height: '400px' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={item.image}
                            alt={item.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Category: {item.category}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                                Price: ${item.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Rating: {item.rating.rate}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Products;
