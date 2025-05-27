// layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/homepage/Navbar";
import Footer from "../components/homepage/Footer";
import Content from "../components/homepage/Content";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </>
  );
};

export default MainLayout;
