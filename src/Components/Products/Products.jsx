// Products.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../Store/Slices/ProductSlice";
import { Card, CardContent, CardMedia, Typography, CircularProgress, Grid, TextField } from "@mui/material";
import ProductModal from "./ProductModal";
import { Star } from "@mui/icons-material";

function Products() {
    const dispatch = useDispatch();
    const { product, status, error } = useSelector((state) => state.product);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const handleOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const truncateTitle = (title) => {
        return title.length > 45 ? `${title.slice(0, 47)}…` : title;
    };

    const filteredProducts = product?.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    if (status === "loading") return <CircularProgress />;
    if (status === "failed") return <p>No products found</p>;

    return (
        <>
            <TextField
                variant="outlined"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Grid container spacing={3} justifyContent="center" marginTop={2}>
                {filteredProducts && filteredProducts.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ maxWidth: 345, boxShadow: 3, height: '400px' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={item.image}
                                alt={item.title}
                                onClick={() => handleOpen(item)}
                                sx={{ cursor: 'pointer' }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {truncateTitle(item.title)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {item.category}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    Price: ${item.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                    Rating: {item.rating.rate}
                                    <Star sx={{ color: 'yellow', ml: 1 }} />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <ProductModal open={open} handleClose={handleClose} product={selectedProduct} />
        </>
    );
}

export default Products;
