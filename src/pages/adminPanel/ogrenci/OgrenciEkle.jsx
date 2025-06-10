import { useState } from "react";
import "./OgrenciEkle.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Loading from "../../loading/Loading";
import { useDispatch } from "react-redux";
import kimlikImg from "/images/kimlik.jpeg";
import { apiCreateStudent } from "../../../api/apiStudent";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const OgrenciEkle = () => {
  const dispatch = useDispatch();
  const [identityImage, setIdentityImage] = useState(null);
  const [isLoading, setIsloading] = useState(false);
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

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setIdentityImage(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

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
      await apiCreateStudent(formDataToSend);
      setFormData({
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
      setIdentityImage(null);
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Öğrenci Başarıyla Eklendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.message || "Öğrenci Eklenemedi",
          status: "error",
        })
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Öğrenci Ekle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="studentCreate">
          <div className="leftSideStudent">
            <div className="avatar">
              <input
                type="file"
                accept="image/*"
                className="upload-input"
                id="kapakFoto"
                onChange={handleKapakImageChange}
                style={{ display: "none" }}
              />

              <label htmlFor="kapakFoto" className="kapsayiciButton">
                {identityImage ? (
                  <img className="kapakImgg" src={kimlikImg} alt="kapakResmi" />
                ) : (
                  <div className="Text">
                    <ImageSearchIcon />
                    Öğrencinin Kimlik Resmi
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="rightSection">
            <div className="rightText">
              <label>
                Öğrenci Ad:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </label>

              <label>
                Öğrenci Soyadı:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </label>

              <label>
                Öğrenci Mail:
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </label>

              <label>
                Öğrenci Doğum Tarihi:
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </label>

              <label>
                Öğrenci TC:
                <input
                  type="text"
                  name="identity"
                  value={formData.identity}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </label>

              <label>
                Öğrenci Kan Grubu:
                <select
                  required
                  autoComplete="off"
                  value={formData.bloodType}
                  onChange={handleChange}
                  name="bloodType"
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
              </label>

              <label>
                Öğrenci Telefon:
                <input
                  name="phoneNo"
                  type="text"
                  placeholder="53X XXX XX XX"
                  value={formData.phoneNo}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 10); // En fazla 10 rakam
                    setFormData({ ...formData, phoneNo: raw });
                  }}
                  required
                />
              </label>

              <label>
                Öğrenci Veli Ad Soyad:
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </label>

              <label>
                Öğrenci Veli Telefon:
                <input
                  name="parentPhoneNo"
                  type="text"
                  placeholder="53X XXX XX XX"
                  value={formData.parentPhoneNo}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, 10); // En fazla 10 rakam
                    setFormData({ ...formData, parentPhoneNo: raw });
                  }}
                  required
                />
              </label>

              <label>
                Adres:
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </label>

              <label>
                Muafakatname Onay:
                <select
                  required
                  autoComplete="off"
                  value={formData.consentForm}
                  onChange={handleChange}
                  name="consentForm"
                >
                  <option disabled value="">
                    Birini seç
                  </option>
                  <option value={true}>Evet</option>
                  <option value={false}>Hayır</option>
                </select>
              </label>

              <label>
                Taahütname Onay:
                <select
                  required
                  autoComplete="off"
                  value={formData.undertakingForm}
                  onChange={handleChange}
                  name="undertakingForm"
                >
                  <option disabled value="">
                    Birini seç
                  </option>
                  <option value={true}>Evet</option>
                  <option value={false}>Hayır</option>
                </select>
              </label>

              <div className="buttonContainer">
                <button type="submit">Öğrenci Ekle</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default OgrenciEkle;
