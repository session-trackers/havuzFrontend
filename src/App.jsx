import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Anasayfa from "./pages/anasayfa/Anasayfa.jsx";
import Footer from "./components/Footer/Footer.jsx";
import FooterTop from "./components/FooterTop/FooterTop.jsx";
import Projeler from "./pages/projeler/Projeler.jsx";
import Iletisim from "./pages/iletisim/Iletisim.jsx";
import Hakkimizda from "./pages/Hakkımizda/Hakkimizda.jsx";
import AdminDashboard from "./pages/adminPanel/AdminDashboard.jsx";

import AdminLogin from "./pages/adminPanel/AdminLogin.jsx";
import Categories from "./pages/Categories/Categories.jsx";

import ProtectedRoute from "./context/ProtectedRoute.jsx";
import Unauthorized from "./pages/yetkisizGiris/Unauthorized.jsx";
import ScrollToTop from "./components/scrollTop/ScrollToTop.jsx";
import Referanslar from "./pages/Referanslar/Referanslar.jsx";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./api/api.js";
import { setLogin, setLogout } from "./redux/slices/authSlice.js";
import AdminHocaCreate from "./pages/adminPanel/kadro/AdminHocaCreate.jsx";
import AdminHocaEdit from "./pages/adminPanel/kadro/AdminHocaEdit.jsx";
import AdminHavuzCreate from "./pages/adminPanel/havuz/AdminHavuzCreate.jsx";
import AdminHavuzEdit from "./pages/adminPanel/havuz/AdminHavuzEdit.jsx";
import AdminSessionCreate from "./pages/adminPanel/seans/AdminSessionCreate.jsx";
import AdminSessionEdit from "./pages/adminPanel/seans/AdminSessionEdit.jsx";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.authSlice);

  useEffect(() => {
    const silentLogin = async () => {
      try {
        const response = await api.post(
          "/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );
        const data = response.data;
        dispatch(setLogin(data));
      } catch (err) {
        console.log("Session expired or user not logged in", err);
        dispatch(setLogout());
      }
    };

    if (!accessToken) {
      silentLogin();
    }
  }, [dispatch, accessToken]);

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/kategoriler" element={<Categories />} />
        <Route path="/kategoriler/:linkName" element={<Projeler />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/referanslar" element={<Referanslar />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute redirectTo="/admin-login" allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="hocaekle" element={<AdminHocaCreate />} />
          <Route path="hocaduzenle" element={<AdminHocaEdit />} />
          <Route path="havuzekle" element={<AdminHavuzCreate />} />
          <Route path="havuzduzenle" element={<AdminHavuzEdit />} />
          <Route path="seansekle" element={<AdminSessionCreate />} />
          <Route path="seansduzenle" element={<AdminSessionEdit />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <FooterTop />
      <Footer />
    </>
  );
}

export default App;
