import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";

test("displays 'No Products Found' message when no products are provided", () => {
    render(<ProductList products={[]} handleOpen={vi.fn()} />);
    expect(screen.getByText("No Products Found")).toBeInTheDocument();
});
