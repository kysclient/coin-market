import { routes } from "../routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GeistProvider } from "@geist-ui/core";
import "./styles/global.scss";
const router = createBrowserRouter(routes);

function App() {
  return (
    <GeistProvider themeType={"light"}>
      <RouterProvider router={router} />
    </GeistProvider>
  );
}

export default App;
