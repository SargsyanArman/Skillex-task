import React from "react";
import { Slider, Checkbox, FormControlLabel, TextField, Box, Select, MenuItem, InputLabel, FormControl, Typography } from "@mui/material";

const FiltersPanel = ({ searchTerm, handleSearchChange, categoryFilter, handleCategoryChange, priceRange, handlePriceChange, ratingFilter, handleRatingChange, sortOption, setSortOption }) => {
    return (
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
                    control={<Checkbox value={category} checked={categoryFilter.includes(category)} onChange={handleCategoryChange} />}
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

            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                    labelId="sort-label"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <MenuItem value="popularity">Popularity</MenuItem>
                    <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                    <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default FiltersPanel;
