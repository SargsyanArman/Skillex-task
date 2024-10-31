// ProductModal.jsx
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
                    width: 500,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                {product && (
                    <>

                        <CardMedia
                            component="img"
                            height="450"
                            image={product.image}
                            alt={product.title}
                        />
                        <Typography id="product-modal-title" variant="h5" component="h2">
                            {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Category: {product.category}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                            Price: ${product.price}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                                Rating: {product.rating.rate}
                                <Star sx={{ color: 'yellow' }} />
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
