import { useState } from "react";
import "./CustomerLogin.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import api from "../../api/api";
import { setLogin } from "../../redux/slices/authSlice";
import Loading from "../loading/Loading";

function CustomerLogin() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLogin, role, isAuthChecked } = useSelector(
    (state) => state.authSlice
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/v1/auth/c-login", {
        username,
        password,
      });

      dispatch(setLogin(response.data));
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    }
  };

  if (!isAuthChecked) {
    return <Loading />;
  }

  if (isLogin && role?.includes("CUSTOMER") && isAuthChecked) {
    return <Navigate to="/profil/bilgiler" replace />;
  }

  return (
    <div className="loginCustomer">
      <div className="container cont">
        <div className="loginSection">
          <div className="loginSectionLeft">
            <div className="title">
              <h2>Kayıt Sorgu</h2>
              <div className="socialMedia"></div>
            </div>
            <form onSubmit={handleLogin}>
              <div className="userName abc">
                <p>T.C. Kimlik No</p>
                <input
                  required
                  name="username"
                  className="textInput"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="password abc">
                <p>Doğrum Tarihi</p>
                <input
                  required
                  name="date"
                  className="textInput"
                  type="date"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="controller">
                <div className="button">
                  <button type="submit" className="btn-card">
                    Giriş Yap
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="loginSectionRight">
            <div className="title">
              <h4 style={{ textAlign: "center" }}>
                Kimlik Bilgilerinizi Girerek Sorgulama İşlemi Yapın
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
