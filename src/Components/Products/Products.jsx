import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../Store/Slices/ProductSlice";
import { CircularProgress, Box } from "@mui/material";
import ProductModal from "./ProductModal";
import FiltersPanel from "./FiltersPanel";
import ProductList from "./ProductList";
import { useDebounce } from "../Hooks/useDebounce";

function Products() {
    const dispatch = useDispatch();
    const { product, status, error } = useSelector((state) => state.product);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [categoryFilter, setCategoryFilter] = useState(() => {
        return JSON.parse(localStorage.getItem("categoryFilter")) || [];
    });
    const [priceRange, setPriceRange] = useState(() => {
        return JSON.parse(localStorage.getItem("priceRange")) || [0, 1000];
    });
    const [ratingFilter, setRatingFilter] = useState(() => {
        return JSON.parse(localStorage.getItem("ratingFilter")) || 0;
    });
    const [searchTerm, setSearchTerm] = useState(() => {
        return localStorage.getItem("searchTerm") || "";
    });
    const [sortOption, setSortOption] = useState(() => {
        return localStorage.getItem("sortOption") || "popularity";
    });

    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const debouncedPriceRange = useDebounce(priceRange, 300);
    const debouncedRatingFilter = useDebounce(ratingFilter, 300);

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const filteredProducts = useMemo(() => {
        let filtered = product.filter((item) =>
            item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );

        if (categoryFilter.length > 0) {
            filtered = filtered.filter((item) => categoryFilter.includes(item.category));
        }

        if (debouncedPriceRange) {
            filtered = filtered.filter(
                (item) => item.price >= debouncedPriceRange[0] && item.price <= debouncedPriceRange[1]
            );
        }

        if (debouncedRatingFilter) {
            filtered = filtered.filter((item) => item.rating.rate >= debouncedRatingFilter);
        }

        switch (sortOption) {
            case "popularity":
                return filtered.sort((a, b) => b.rating.count - a.rating.count);
            case "priceAsc":
                return filtered.sort((a, b) => a.price - b.price);
            case "priceDesc":
                return filtered.sort((a, b) => b.price - a.price);
            case "rating":
                return filtered.sort((a, b) => b.rating.rate - a.rating.rate);
            default:
                return filtered;
        }
    }, [product, categoryFilter, debouncedSearchTerm, debouncedPriceRange, debouncedRatingFilter, sortOption]);

    const handleOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
            <FiltersPanel
                searchTerm={searchTerm}
                handleSearchChange={(e) => {
                    setSearchTerm(e.target.value);
                    localStorage.setItem("searchTerm", e.target.value);
                }}
                categoryFilter={categoryFilter}
                handleCategoryChange={(e) => {
                    const category = e.target.value;
                    const newCategoryFilter = categoryFilter.includes(category)
                        ? categoryFilter.filter((c) => c !== category)
                        : [...categoryFilter, category];

                    setCategoryFilter(newCategoryFilter);
                    localStorage.setItem("categoryFilter", JSON.stringify(newCategoryFilter));
                }}
                priceRange={priceRange}
                handlePriceChange={(event, newValue) => {
                    setPriceRange(newValue);
                    localStorage.setItem("priceRange", JSON.stringify(newValue));
                }}
                ratingFilter={ratingFilter}
                handleRatingChange={(event, newValue) => {
                    setRatingFilter(newValue);
                    localStorage.setItem("ratingFilter", newValue);
                }}
                sortOption={sortOption}
                setSortOption={(value) => {
                    setSortOption(value);
                    localStorage.setItem("sortOption", value);
                }}
            />
            <Box flexGrow={1} p={2}>
                {status === "loading" && <CircularProgress />}
                {status === "failed" && <h1>{error}</h1>}
                {status === "succeeded" && (
                    <ProductList products={filteredProducts} handleOpen={handleOpen} />
                )}
            </Box>
            <ProductModal open={open} handleClose={handleClose} product={selectedProduct} />
        </Box>
    );
}

export default Products;
