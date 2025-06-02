import "./AdminDashboard.scss";
import { Link, Outlet } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="adminDashboard">
      <div className="container">
        <div className="contentAdminDashboard">
          <sidebar className="sidebar">
            <div className="categories">
              <div className="title">
                <h4>Aksiyon</h4>
                <hr />
              </div>
              <div className="listCategories">
                <ul>
                  <li>
                    <Link to="/admin/odeme">
                      <span>Ödeme Bölümü</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/paketekle">
                      <span>Paket Ekle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/paketduzenle">
                      <span>Paket Düzenle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/seansekle">
                      <span>Seans Ekle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/seansduzenle">
                      <span>Seans Düzenle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/devamsizlikgir">
                      <span>Devamsızlık Giriş</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/devamsizlikgoruntule">
                      <span>Devamsızlık Bilgileri</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/ogrenciekle">
                      <span>Öğrenci Ekle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/ogrenciduzenle">
                      <span>Öğrenci Düzenle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/hocaekle">
                      <span>Hoca Ekle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/hocaduzenle">
                      <span>Hoca Düzenle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/havuzekle">
                      <span>Havuz Ekle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/havuzduzenle">
                      <span>Havuz Düzenle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <button
                      style={{ width: "100%", backgroundColor: "white" }}
                      onClick={async () => {
                        navigate("/admin-login");
                      }}
                    >
                      <span>Çıkış Yap</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </sidebar>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
