import { useEffect, useState } from "react";
import "./OgrenciEkle.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Loading from "../../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getStudentsById,
  updateStundet,
} from "../../../redux/slices/studentSlice";
import api from "../../../api/api";
import CloseIcon from "@mui/icons-material/Close";
import {
  deletePaketsByUserId,
  getPaketsByUserId,
  setSelectedPaket,
} from "../../../redux/slices/paketSlice";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const OgrenciDuzenle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isAuthChecked } = useSelector((state) => state.authSlice);
  const { paketler, selectedPaket } = useSelector((state) => state.paketSlice);
  const [initialIdentityImage, setInitialIdentityImage] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    birthDate: "",
    identity: "",
    parentName: "",
    parentPhoneNo: "",
    address: "",
    bloodType: "",
    phoneNo: "",
    identityImage: "",
  });
  const [initialFormData, setInitialFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    birthDate: "",
    identity: "",
    parentName: "",
    parentPhoneNo: "",
    address: "",
    bloodType: "",
    phoneNo: "",
    identityImage: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(getStudentsById(id)).unwrap();
        const ImgPrivate =
          data?.identityImage?.url == null
            ? null
            : await api.get(data?.identityImage?.url, {
                responseType: "blob",
              });
        const imageUrl =
          ImgPrivate == null ? null : URL.createObjectURL(ImgPrivate.data);

        setInitialFormData({
          id: data?.id || "",
          name: data?.name || "",
          lastName: data?.lastName || "",
          email: data?.email || "",
          birthDate: data?.birthDate || "",
          identity: data?.identity || "",
          parentName: data?.parentName || "",
          parentPhoneNo: data?.parentPhoneNo || "",
          address: data?.address || "",
          bloodType: data?.bloodType || "",
          phoneNo: data?.phoneNo || "",
          identityImage: imageUrl || "",
        });

        setFormData({
          id: data?.id || "",
          name: data?.name || "",
          lastName: data?.lastName || "",
          email: data?.email || "",
          birthDate: data?.birthDate || "",
          identity: data?.identity || "",
          parentName: data?.parentName || "",
          parentPhoneNo: data?.parentPhoneNo || "",
          address: data?.address || "",
          bloodType: data?.bloodType || "",
          phoneNo: data?.phoneNo || "",
          identityImage: imageUrl || "",
        });

        setInitialIdentityImage(imageUrl);
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.message,
            status: "error",
          })
        );
      }
    };

    const listUserByIdFunc = async (userId) => {
      try {
        const response = await dispatch(getPaketsByUserId(userId)).unwrap();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (isAuthChecked) {
      fetchData();
      listUserByIdFunc(id);
    }
  }, [id, isAuthChecked, isSubmitted]);

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      identityImage: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitDuzenleStudent = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      await dispatch(
        updateStundet({ formData, initialIdentityImage })
      ).unwrap();
      setIsSubmitted((prev) => !prev); // ✅ Bu satır useEffect'i tetikleyecek
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Öğrenci başarıyla güncellendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.message,
          status: "error",
        })
      );
    } finally {
      setIsloading(false);
    }
  };

  const deletePaket = async () => {
    setIsloading(true);

    try {
      await await dispatch(
        deletePaketsByUserId({ paketId: selectedPaket, userId: formData.id })
      ).unwrap();
      dispatch(setSelectedPaket(null));
      setIsSubmitted((prev) => !prev);
      setIsloading(false);
      setShowPopup(false);
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Öğrenci Düzenlendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.message || "Öğrenci Düzenlenemedi",
          status: "error",
        })
      );
    }
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Öğrenciyi Düzenle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmitDuzenleStudent} className="studentCreate">
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
                {formData.identityImage ? (
                  <img
                    className="kapakImgg"
                    src={
                      typeof formData.identityImage === "string"
                        ? formData.identityImage
                        : formData.identityImage instanceof File
                        ? URL.createObjectURL(formData.identityImage)
                        : ""
                    }
                    alt="kapakResmi"
                  />
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
            <div className="paketConteiner">
              <div className="paketList">
                {paketler.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item.status == "APPROVED" || item.status == "PENDING"
                        ? "paket"
                        : "paket disabled"
                    }
                  >
                    <span className="title">{item.name}</span>
                    <span className="dateA">
                      {item.startDate == null
                        ? "Paket Bslngc tar. yok"
                        : item.startDate}{" "}
                      <br />
                      {item.finishDate == null
                        ? "Paket Bitiş tar. yok"
                        : item.finishDate}
                    </span>
                    <span
                      className={
                        item.status == "PENDING"
                          ? "kahverengi"
                          : item.status == "REJECTED"
                          ? "kirmizi"
                          : "yesil"
                      }
                    >
                      {item.status == "PENDING"
                        ? "Onay Bekliyor"
                        : item.status == "REJECTED"
                        ? "Üyelik İptal/Red Edilmiş"
                        : "Üyelik Aktif"}
                    </span>

                    <button
                      onClick={() => {
                        dispatch(setSelectedPaket(item.id));
                        setShowPopup(true);
                      }}
                      className={
                        item.status == "APPROVED" || item.status == "PENDING"
                          ? "buttonX"
                          : "buttonXDisable"
                      }
                    >
                      <CloseIcon className="icon" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

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
                  style={{ backgroundColor: "lightgray", color: "white" }}
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  disabled
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

              <div className="buttonContainer">
                <button
                  disabled={
                    JSON.stringify(formData) === JSON.stringify(initialFormData)
                  }
                  className={
                    JSON.stringify(formData) === JSON.stringify(initialFormData)
                      ? "disabled"
                      : ""
                  }
                  type="submit"
                >
                  Öğrenci Düzenle
                </button>
              </div>
            </div>
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-inner">
                <p>Silmek istediğinize emin misiniz?</p>
                <div className="popup-buttons">
                  <button
                    className="cancel"
                    type="button"
                    onClick={() => {
                      setShowPopup(false);
                      dispatch(setSelectedPaket(null));
                    }}
                  >
                    İptal
                  </button>
                  <button
                    type="button"
                    className="confirm"
                    onClick={deletePaket}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default OgrenciDuzenle;
