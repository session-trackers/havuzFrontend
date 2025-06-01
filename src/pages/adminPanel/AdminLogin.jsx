import { useNavigate, Navigate } from "react-router-dom";
import "./AdminLogin.scss";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth(); // Kullanıcının giriş durumu
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Giriş yapıldıysa doğrudan admin paneline yönlendirme
  if (isAuthenticated) {
    return <Navigate to="/admin/ekle" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        formData
      );
      const token = response.data.token;

      if (token) {
        setLoading(false);
        login(token);
        navigate("/admin/ekle");
      }
    } catch (err) {
      setError("Giriş başarısız. Kullanıcı adı veya şifre yanlış.");
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="loginSection">
          <div className="loginSectionLeft">
            <div className="title">
              <h2>Giriş Yap</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="userName abc">
                <p>Kullanıcı Adı</p>
                <input
                  className="textInput"
                  type="email"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Kullanıcı Adı"
                />
              </div>

              <div className="password abc">
                <p>Şifre</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Şifre"
                  className="textInput"
                />
              </div>
              <div className="controller">
                <div className="button">
                  <button type="submit" className="btn-card" disabled={loading}>
                    {loading ? "Yükleniyor" : "Giriş Yap"}
                  </button>
                  {error && <p style={{ marginTop: "1rem" }}>{error}</p>}
                </div>
              </div>
            </form>
          </div>
          <div className="loginSectionRight">
            <div className="title">
              <h4>Di-Kawn Endüstriyel Yönetim Paneli</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
