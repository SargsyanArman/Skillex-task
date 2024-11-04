import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FiltersPanel from "./FiltersPanel";

test("renders FiltersPanel and handles filter changes", () => {
    const handleSearchChange = vi.fn();
    const handleCategoryChange = vi.fn();
    const handlePriceChange = vi.fn();
    const handleRatingChange = vi.fn();
    const setSortOption = vi.fn();

    render(
        <FiltersPanel
            searchTerm="test"
            handleSearchChange={handleSearchChange}
            categoryFilter={["electronics"]}
            handleCategoryChange={handleCategoryChange}
            priceRange={[0, 50]}
            handlePriceChange={handlePriceChange}
            ratingFilter={3}
            handleRatingChange={handleRatingChange}
            sortOption="popularity"
            setSortOption={setSortOption}
        />
    );

    fireEvent.change(screen.getByLabelText(/Search/i), { target: { value: "phone" } });
    expect(handleSearchChange).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText(/electronics/i));
    expect(handleCategoryChange).toHaveBeenCalled();

    const sortSelect = screen.getByLabelText(/Sort By/i);
    fireEvent.mouseDown(sortSelect);
    const option = screen.getByRole("option", { name: "Price: Low to High" });
    fireEvent.click(option);
    expect(setSortOption).toHaveBeenCalledWith("priceAsc");
});
