import "./AdminDashboard.scss";
import { Link, Outlet } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { logout } = useAuth(); // Kullanıcının giriş durumu
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
                    <Link to="/admin/ekle">
                      <span>Ürün Ekle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/urunler">
                      <span>Ürünler</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/kategoriekle">
                      <span>Kategori Ekle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/kategoriduzenle">
                      <span>Kategori Düzenle</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <button
                      style={{ width: "100%", backgroundColor: "white" }}
                      onClick={async () => {
                        await logout();
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
