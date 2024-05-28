import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-4 pt-40 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
