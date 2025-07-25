import { useEffect, useState } from "react";
import "./CustomerRegister.scss";
import Loading from "../loading/Loading";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeoutKullanici } from "../../redux/slices/alertKullaniciSlice";
import { useNavigate } from "react-router-dom";

function CustomerRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (isAuthChecked && isLogin) {
      navigate("/");
    }
  }, [isAuthChecked, isLogin, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    birthDate: "",
    identity: "",
    parentName: "",
    parentPhoneNo: "",
    address: "",
    consentForm: false,
    undertakingForm: true,
    bloodType: "",
    phoneNo: "",
  });
  const [identityImage, setIdentityImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "consentForm") {
      setFormData({
        ...formData,
        consentForm: checked,
        undertakingForm: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNo", formData.phoneNo);
    formDataToSend.append("birthDate", formData.birthDate);
    formDataToSend.append("identity", formData.identity);
    formDataToSend.append("identityImage", identityImage);
    formDataToSend.append("parentName", formData.parentName);
    formDataToSend.append("parentPhoneNo", formData.parentPhoneNo);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("consentForm", formData.consentForm);
    formDataToSend.append("undertakingForm", formData.undertakingForm);
    formDataToSend.append("bloodType", formData.bloodType);

    try {
      await axios.post(`${BASE_URL}/api/v1/customer`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Kayıt Başarılı",
          status: "success",
        })
      );

      setFormData({
        lastName: "",
        email: "",
        birthDate: "",
        identity: "",
        parentName: "",
        parentPhoneNo: "",
        address: "",
        consentForm: false,
        undertakingForm: true,
        bloodType: "",
        phoneNo: "",
      });
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.data || "Hata",
          status: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !isAuthChecked) return <Loading />;

  return (
    <div className="registerCustomer">
      <div className="container cont">
        <div className="loginSection">
          <div className="loginSectionLeft">
            <div className="title">
              <h2>Üye Ol</h2>
              <div className="socialMedia"></div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {[
                  { label: "Ad", name: "name", type: "text" },
                  { label: "Soyad", name: "lastName", type: "text" },
                  { label: "E-posta", name: "email", type: "email" },
                  { label: "Veli Adı", name: "parentName", type: "text" },
                  { label: "Adres", name: "address", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="abc">
                    <input
                      required
                      name={field.name}
                      type={field.type}
                      className="textInput"
                      placeholder={field.label}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div className="abc">
                  <input
                    required
                    name={"identity"}
                    type={"text"}
                    className="textInput"
                    maxLength={11}
                    placeholder={"T.C. Kimlik No"}
                    value={formData.identity}
                    pattern="\d{11}"
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, ""); // sadece rakam
                      setFormData((prev) => ({
                        ...prev,
                        identity: onlyDigits,
                      }));
                    }}
                  />
                </div>

                <div className="abc">
                  <input
                    name="parentPhoneNo"
                    type="text"
                    className="textInput"
                    placeholder="Veli Tel: 53X XXX XX XX"
                    value={formData.parentPhoneNo}
                    onChange={(e) => {
                      const raw = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10); // En fazla 10 rakam
                      setFormData({ ...formData, parentPhoneNo: raw });
                    }}
                    required
                  />
                </div>

                <div className="abc">
                  <input
                    name="phoneNo"
                    type="text"
                    className="textInput"
                    placeholder="Öğrenci Tel: 53X XXX XX XX"
                    value={formData.phoneNo}
                    onChange={(e) => {
                      const raw = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10); // En fazla 10 rakam
                      setFormData({ ...formData, phoneNo: raw });
                    }}
                    required
                  />
                </div>

                {/* Kan Grubu Seçimi */}
                <div className="abc">
                  <select
                    name="bloodType"
                    className="textInput"
                    value={formData.bloodType}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Kan Grubu Seçiniz
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="0+">0+</option>
                    <option value="0-">0-</option>
                  </select>
                </div>

                <div className="abc">
                  <input
                    required
                    type="file"
                    name="identityImage"
                    className="textInput"
                    accept="image/*"
                    onChange={(e) => setIdentityImage(e.target.files[0])}
                  />
                  <span style={{ fontSize: "0.85rem" }}>
                    <i> Buraya kimlik resminizin ön yüzünü yükleyin</i>
                  </span>
                </div>

                <div className="abc">
                  <input
                    required
                    name={"birthDate"}
                    type={"date"}
                    className="textInput"
                    placeholder={"Doğum Tarihiniz"}
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                  <span style={{ fontSize: "0.85rem" }}>
                    <i> Doğum Tarihiniz</i>
                  </span>
                </div>
              </div>

              <div className="form-agreement">
                <input
                  type="checkbox"
                  name="consentForm"
                  checked={formData.consentForm}
                  onChange={handleChange}
                  required
                />
                <span>
                  <a
                    href="/gizlilik-politikasi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gizlilik Politikası
                  </a>
                  {", "}
                  <a href="/kvkk" target="_blank" rel="noopener noreferrer">
                    KVKK
                  </a>
                  {", "}
                  <a
                    href="/muvafakatname"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Muvafakatname
                  </a>{" "}
                  ve{" "}
                  <a
                    href="/taahhutname"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Taahhütname
                  </a>{" "}
                  hükümlerini okudum, kabul ediyorum.
                </span>
              </div>

              <div className="controller">
                <div className="button">
                  <button type="submit" className="btn-card">
                    Üye Ol
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;
