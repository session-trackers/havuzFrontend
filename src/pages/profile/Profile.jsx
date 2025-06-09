import "./Profile.scss";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutBackend } from "../../api/apiAuth";
import { setLogout } from "../../redux/slices/authSlice";
import PoolIcon from "@mui/icons-material/Pool";
import FaceRetouchingOffIcon from "@mui/icons-material/FaceRetouchingOff";
import ReceiptIcon from "@mui/icons-material/Receipt";

const Profile = () => {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="account">
        <div className="sidebarKullanici">
          <div className="top">
            <div className="logo">Kullanıcı Paneli</div>
          </div>
          <hr />
          <div className="center">
            <ul>
              <li>
                <Link to="/profil/bilgiler">
                  <SpaceDashboardIcon className="icon" />
                  <span>Profilim</span>
                </Link>
              </li>
              <li>
                <Link to="/profil/seanslarim">
                  <PoolIcon className="icon" />
                  <span>Kayıtlı Seanslar</span>
                </Link>
              </li>
              <li>
                <Link to="/profil/devamsizlik">
                  <FaceRetouchingOffIcon className="icon" />
                  <span>Devamsızlık Durumu</span>
                </Link>
              </li>
              <li>
                <Link to="/profil/siparislerim">
                  <ReceiptIcon className="icon" />
                  <span>Ödeme Bölümü</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={async () => {
                    try {
                      await logOutBackend();
                      dispatch(setLogout());
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <PowerSettingsNewRoundedIcon className="icon" />
                  <span>Çıkış Yap</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <section className="section">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Profile;
