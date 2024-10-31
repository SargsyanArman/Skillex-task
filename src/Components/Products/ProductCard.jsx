import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

const ProductCard = ({ product, handleOpen }) => {
    const truncateTitle = (title) => (title.length > 45 ? `${title.slice(0, 47)}…` : title);

    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3, height: "400px" }}>
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                onClick={() => handleOpen(product)}
                sx={{ cursor: "pointer" }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {truncateTitle(product.title)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                    Rating: {product.rating.rate}
                    <Star sx={{ color: "yellow", ml: 1 }} />
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
