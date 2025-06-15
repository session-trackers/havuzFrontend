import "./CoDashboard.scss";
import { Link, Outlet } from "react-router-dom";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import api from "../../api/api";
import { BASE_URL } from "../../config/baseApi";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/slices/authSlice";

const CoDashboard = () => {
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
                    <Link to="/coach/devamsizlikgoruntule">
                      <span>Öğrenci Devamsızlık Bilgileri</span>
                      <ChevronRightOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link to="/coach/devamsizlikgir">
                      <span>Öğrenci Devamsızlık Giriş</span>
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

export default CoDashboard;
