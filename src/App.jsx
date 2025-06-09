import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Anasayfa from "./pages/anasayfa/Anasayfa.jsx";
import Footer from "./components/Footer/Footer.jsx";
import FooterTop from "./components/FooterTop/FooterTop.jsx";
import Hakkimizda from "./pages/Hakkımizda/Hakkimizda.jsx";
import AdminDashboard from "./pages/adminPanel/AdminDashboard.jsx";
import AdminLogin from "./pages/adminPanel/AdminLogin.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import Unauthorized from "./pages/yetkisizGiris/Unauthorized.jsx";
import ScrollToTop from "./components/scrollTop/ScrollToTop.jsx";
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
import AdminPaketEkle from "./pages/adminPanel/paket/AdminPaketEkle.jsx";
import AdminPaketDuzenle from "./pages/adminPanel/paket/AdminPaketDuzenle.jsx";
import AdminDevamsizlikGir from "./pages/adminPanel/devamsizlik/AdminDevamsizlikGir.jsx";
import KullaniciBilgileri from "./pages/profile/Bilgiler/Bilgiler.jsx";
import SiparisMusteri from "./pages/profile/siparis/SiparisMusteri.jsx";
import Profile from "./pages/profile/Profile.jsx";
import KayitliSeanslar from "./pages/profile/KayitliSeanslar/KayitliSeanslar.jsx";
import AdminDevamsizlikGoruntule from "./pages/adminPanel/devamsizlik/AdminDevamsizlikGoruntule.jsx";
import OgrenciEkle from "./pages/adminPanel/ogrenci/OgrenciEkle.jsx";
import OgrenciDuzenle from "./pages/adminPanel/ogrenci/OgrenciDuzenle.jsx";
import Ogrenciler from "./pages/adminPanel/ogrenci/Ogrenciler.jsx";
import AdminPaketler from "./pages/adminPanel/paket/AdminPaketler.jsx";
import AdminDevamsizlikKadroGir from "./pages/adminPanel/devamsizlik/AdminDevamsizlikKadroGir.jsx";
import AdminDevamsizlikGoruntuleKAdro from "./pages/adminPanel/devamsizlik/AdminDevamsizlikGoruntuleKAdro.jsx";
import Siparisler from "./pages/adminPanel/siparisler/Siparisler.jsx";
import OnKayit from "./pages/adminPanel/onKayıt/OnKayit.jsx";
import Devamsizlik from "./pages/profile/Devamsizlik/Devamsizlik.jsx";
import Paketler from "./pages/Paketler/Paketler.jsx";
import PaketDetay from "./pages/PaketDetay/PaketDetay.jsx";

import Antrenorler from "./pages/Antrenörler/Antrenorler.jsx";
import Havuzlar from "./pages/Havuzlar/Havuzlar.jsx";
import HavuzDetay from "./pages/HavuzDetay/HavuzDetay.jsx";
import CustomerLogin from "./pages/customerLogin/CustomerLogin.jsx";

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
        <Route path="/paketler" element={<Paketler />} />
        <Route path="/paketler/:id" element={<PaketDetay />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/antrenorler" element={<Antrenorler />} />
        <Route path="/havuzlar" element={<Havuzlar />} />
        <Route path="/havuzlar/:id" element={<HavuzDetay />} />
        <Route path="/customerlogin" element={<CustomerLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute redirectTo="/admin-login" allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="siparisler" element={<Siparisler />} />
          <Route path="onkayit" element={<OnKayit />} />
          <Route path="hocaekle" element={<AdminHocaCreate />} />
          <Route path="hocaduzenle" element={<AdminHocaEdit />} />
          <Route path="havuzekle" element={<AdminHavuzCreate />} />
          <Route path="havuzduzenle" element={<AdminHavuzEdit />} />
          <Route path="seansekle" element={<AdminSessionCreate />} />
          <Route path="seansduzenle" element={<AdminSessionEdit />} />
          <Route path="paketler" element={<AdminPaketler />} />
          <Route path="paketekle" element={<AdminPaketEkle />} />
          <Route path="paketduzenle/:id" element={<AdminPaketDuzenle />} />

          <Route path="devamsizlikgir" element={<AdminDevamsizlikGir />} />
          <Route
            path="devamsizlikgirhoca"
            element={<AdminDevamsizlikKadroGir />}
          />
          <Route
            path="devamsizlikgoruntule"
            element={<AdminDevamsizlikGoruntule />}
          />
          <Route
            path="devamsizlikgoruntulekadro"
            element={<AdminDevamsizlikGoruntuleKAdro />}
          />
          <Route path="ogrenciler" element={<Ogrenciler />} />
          <Route path="ogrenciekle" element={<OgrenciEkle />} />
          <Route path="ogrenciduzenle/:id" element={<OgrenciDuzenle />} />
        </Route>

        <Route
          path="/profil"
          element={
            <ProtectedRoute
              redirectTo="/customerlogin"
              allowedRoles={["CUSTOMER"]}
            >
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="bilgiler" element={<KullaniciBilgileri />} />
          <Route path="devamsizlik" element={<Devamsizlik />} />
          <Route path="seanslarim" element={<KayitliSeanslar />} />
          <Route path="siparislerim" element={<SiparisMusteri />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <FooterTop />
      <Footer />
    </>
  );
}

export default App;
