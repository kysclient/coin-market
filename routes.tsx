import MainLayout from "./src/layouts/main-layout";
import { RouteObject } from "react-router-dom";
import ErrorPage from "./src/pages/error-page";
import MarketPage from "./src/pages/market-page";
import BookmarkPage from "./src/pages/bookmark-page";
import MarketDetailPage from "./src/pages/market-detail-page";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MarketPage /> },
      { path: "/bookmark", element: <BookmarkPage /> },
      { path: "/market/:id", element: <MarketDetailPage /> },
    ],
    errorElement: <ErrorPage />,
  },
];
