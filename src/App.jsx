import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
