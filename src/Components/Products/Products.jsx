import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../Store/Slices/ProductSlice";
import { Card, CardContent, CardMedia, Typography, CircularProgress, Grid, Slider, Checkbox, FormControlLabel, TextField, Box } from "@mui/material";
import ProductModal from "./ProductModal";
import { Star } from "@mui/icons-material";
import { useDebounce } from "../Hooks/useDebounce"

function Products() {
    const dispatch = useDispatch();
    const { product, status, error } = useSelector((state) => state.product);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [searchTerm, setSearchTerm] = useState("")

    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const handleOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const truncateTitle = (title) => title.length > 45 ? `${title.slice(0, 47)}…` : title;

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setCategoryFilter((prev) =>
            prev.includes(value) ? prev.filter((cat) => cat !== value) : [...prev, value]
        );
    };


    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRatingFilter(newValue);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(product)) return [];

        return product.filter((item) => {
            const matchesCategory = categoryFilter.length ? categoryFilter.includes(item.category) : true;
            const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
            const matchesRating = item.rating.rate >= ratingFilter;
            const matchesSearch = item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            return matchesCategory && matchesPrice && matchesRating && matchesSearch;
        });
    }, [product, categoryFilter, priceRange, ratingFilter, debouncedSearchTerm]);

    if (status === "loading") return <CircularProgress />;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ width: 250, p: 2, borderRight: "1px solid #ddd" }}>
                <Typography variant="h6">Filters</Typography>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mb: 2 }}
                />
                <Typography variant="subtitle1">Category</Typography>
                {["electronics", "men's clothing", "women's clothing", "jewelery"].map((category) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={category}
                                checked={categoryFilter.includes(category)}
                                onChange={handleCategoryChange}
                            />
                        }
                        label={category}
                        key={category}
                    />
                ))}

                <Typography variant="subtitle1">Price Range</Typography>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                />

                <Typography variant="subtitle1">Rating</Typography>
                <Slider
                    value={ratingFilter}
                    onChange={handleRatingChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                    step={1}
                    marks
                />
            </Box>

            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={3} justifyContent="center" marginTop={2}>
                    {filteredProducts.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ maxWidth: 345, boxShadow: 3, height: "400px" }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.image}
                                    alt={item.title}
                                    onClick={() => handleOpen(item)}
                                    sx={{ cursor: "pointer" }}
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
                                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                                        Rating: {item.rating.rate}
                                        <Star sx={{ color: "yellow", ml: 1 }} />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <ProductModal open={open} handleClose={handleClose} product={selectedProduct} />
        </Box>
    );
}

export default Products;
