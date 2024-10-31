import React from "react";
import { Modal, Box, Typography, CardMedia, Button } from "@mui/material";
import { Star } from "@mui/icons-material";

function ProductModal({ open, handleClose, product }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="product-modal-title"
            aria-describedby="product-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 500 },
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                {product && (
                    <>
                        <CardMedia
                            component="img"
                            height="450"
                            image={product.image}
                            alt={product.title}
                            sx={{ objectFit: "cover" }}
                        />
                        <Typography id="product-modal-title" variant="h5" component="h2" sx={{ mt: 2 }}>
                            {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Category: {product.category}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ mt: 1 }}>
                            Price: ${product.price.toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                Rating: {product.rating.rate}
                                <Star sx={{ color: 'yellow', ml: 1 }} />
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => alert("Item added to cart")}
                            >
                                Buy
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
}

export default ProductModal;
