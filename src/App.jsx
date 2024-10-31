import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layouts/Layout";
import Products from "./Components/Products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Products /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
