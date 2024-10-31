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

    const handleOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(product)) return [];
        return product.filter((item) => {
            const matchesCategory = categoryFilter.length ? categoryFilter.includes(item.category) : true;
            const matchesPrice = item.price >= debouncedPriceRange[0] && item.price <= debouncedPriceRange[1];
            const matchesRating = item.rating.rate >= debouncedRatingFilter;
            const matchesSearch = item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            return matchesCategory && matchesPrice && matchesRating && matchesSearch;
        });
    }, [product, categoryFilter, debouncedPriceRange, debouncedRatingFilter, debouncedSearchTerm]);

    const sortedProducts = useMemo(() => {
        const sortedArray = [...filteredProducts];
        switch (sortOption) {
            case "priceAsc":
                sortedArray.sort((a, b) => a.price - b.price);
                break;
            case "priceDesc":
                sortedArray.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                sortedArray.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            default:
                break;
        }
        return sortedArray;
    }, [filteredProducts, sortOption]);

    useEffect(() => {
        localStorage.setItem("categoryFilter", JSON.stringify(categoryFilter));
        localStorage.setItem("priceRange", JSON.stringify(priceRange));
        localStorage.setItem("ratingFilter", JSON.stringify(ratingFilter));
        localStorage.setItem("searchTerm", searchTerm);
        localStorage.setItem("sortOption", sortOption);
    }, [categoryFilter, priceRange, ratingFilter, searchTerm, sortOption]);


    if (status === "loading") return <CircularProgress />;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <Box sx={{ display: "flex" }}>
            <FiltersPanel
                searchTerm={searchTerm}
                handleSearchChange={(e) => setSearchTerm(e.target.value)}
                categoryFilter={categoryFilter}
                handleCategoryChange={(e) => setCategoryFilter((prev) =>
                    prev.includes(e.target.value)
                        ? prev.filter((cat) => cat !== e.target.value)
                        : [...prev, e.target.value]
                )}
                priceRange={priceRange}
                handlePriceChange={(e, newValue) => setPriceRange(newValue)}
                ratingFilter={ratingFilter}
                handleRatingChange={(e, newValue) => setRatingFilter(newValue)}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            <Box sx={{ flexGrow: 1, p: 2 }}>
                <ProductList products={sortedProducts} handleOpen={handleOpen} />
            </Box>

            <ProductModal open={open} handleClose={handleClose} product={selectedProduct} />
        </Box>
    );
}

export default Products;
