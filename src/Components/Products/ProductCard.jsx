import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { Star } from "@mui/icons-material";

const ProductCard = ({ product, handleOpen }) => {
    const truncateTitle = (title) => (title.length > 45 ? `${title.slice(0, 40)}…` : title);

    return (
        <Card sx={{ maxWidth: { xs: 685, md: 345 }, boxShadow: 3, height: "100%", transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
            <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.title}
                onClick={() => handleOpen(product)}
                sx={{ cursor: "pointer", objectFit: "contain" }}
            />
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '240px' }}>
                    <Box>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {truncateTitle(product.title)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Category: {product.category}
                        </Typography>
                        <Typography variant="h6" color="text.primary">
                            Price: ${product.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            Rating: {product.rating.rate}
                            <Star sx={{ color: "yellow", ml: 1 }} />
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => handleOpen(product)}
                    >
                        View Details
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
