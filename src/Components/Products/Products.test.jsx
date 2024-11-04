import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { fetchProduct } from "../../Store/Slices/ProductSlice";
import Products from "./Products";

vi.mock("../../Store/Slices/ProductSlice", () => ({
    fetchProduct: vi.fn(),
}));

const mockStore = configureStore({
    reducer: {
        product: () => ({
            product: [],
            status: 'idle',
            error: null,
        }),
    },
});

describe("Products Component", () => {
    test("renders correctly", () => {
        render(
            <Provider store={mockStore}>
                <Products />
            </Provider>
        );
    });
});
