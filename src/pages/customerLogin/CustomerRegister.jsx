import { useState } from "react";
import "./CustomerRegister.scss";
import Loading from "../loading/Loading";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";

function CustomerRegister() {
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
    undertakingForm: false,
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
      alert("Kayıt başarıyla tamamlandı.");
    } catch (error) {
      console.error(error);
      alert("Kayıt sırasında hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

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
                  { label: "Doğum Tarihi", name: "birthDate", type: "date" },
                  { label: "T.C. Kimlik No", name: "identity", type: "text" },
                  { label: "Veli Adı", name: "parentName", type: "text" },
                  {
                    label: "Veli Telefon No",
                    name: "parentPhoneNo",
                    type: "text",
                  },
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
                    name="phoneNo"
                    type="text"
                    className="textInput"
                    placeholder="53X XXX XX XX"
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
                    <i> Buraya kimlik resminizin ön Yüzünü yükleyin</i>
                  </span>
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
                  </a>{" "}
                  ve{" "}
                  <a
                    href="/muafakatname"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Muvafakatname
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
