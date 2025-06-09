import "./AdminDashboard.scss";
import { Link, Outlet } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { BASE_URL } from "../../config/baseApi";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/slices/authSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="adminDashboard">
      <div className="container">
        <div className="contentAdminDashboard">
          <div className="sidebar">
            <div className="categories">
              <div className="title">
                <h4>Aksiyon</h4>
                <hr />
              </div>
              <div className="listCategories">
                <ul>
                  <li>
                    <Link to="/admin/siparisler">
                      <span>Sipariş İşlemleri</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/onkayit">
                      <span>Ön Kayıt İşlemleri</span>
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
                    <Link to="/admin/paketler">
                      <span>Paket İşlemleri</span>
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
                      <span>Seans İşlemleri</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/devamsizlikgoruntule">
                      <span>Öğrenci Devamsızlık Bilgileri</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/devamsizlikgoruntulekadro">
                      <span>Kadro Devamsızlık Bilgileri</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/devamsizlikgir">
                      <span>Öğrenci Devamsızlık Giriş</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/devamsizlikgirhoca">
                      <span>Hoca Devamsızlık Giriş</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/ogrenciler">
                      <span>Öğrenci İşlemleri</span>
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
                        try {
                          await api.post(
                            `${BASE_URL}/api/v1/auth/refresh/logout`
                          );
                          dispatch(setLogout());
                        } catch (error) {
                          console.log(error);
                        }
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
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
