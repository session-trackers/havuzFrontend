import { useState } from "react";
import "./AdminProjeEkle.scss";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import pdfImg from "/images/Icon/adobePDF.webp";

const AdminProjeEkle = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [images, setImages] = useState([]);
  const [imgKapak, setImgKapak] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    categoryName: "",
    type: "kw",
    titleContent: "",
  });
  const [isLoading, setIsloading] = useState(false);

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0); // Sayfa her değiştiğinde en üst konuma kaydırma
    setIsloading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header'ı ekleyin
        },
      });

      if (response.status === 201) {
        const uploadFormData = new FormData();
        const kapakData = new FormData();

        // Resimleri Yükleme
        if (images.length > 0) {
          images.forEach((image) => {
            uploadFormData.append("images", image);
          });
        }

        //Kapak IMG Yükleme
        if (imgKapak) {
          kapakData.append("image", imgKapak);
        }

        // ID ekle (örneğin gönderiden dönen ID kullanılabilir)
        uploadFormData.append("id", response.data.id);
        kapakData.append("id", response.data.id);

        const responseImages = await axios.post(
          `${BASE_URL}/api/v1/image`,
          uploadFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const kapakImages = await axios.post(
          `${BASE_URL}/api/v1/image/cover`,
          kapakData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Resimler yüklendi:", responseImages.data);
        console.log("Kapak Resmi Yüklendi:", kapakImages.data);
      }

      setTimeout(() => {
        navigate("/admin/urunler");
        setIsloading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  // Form Degisiklik
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setImgKapak(file);
  };

  const handleKapakRemoveImage = () => {
    setImgKapak(null);
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Ürün Ekle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="projeEkle">
          <form onSubmit={handleSubmit}>
            <div className="uploader-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
                className="baslikAndButton"
              >
                <h4>Ürün PDF'ini Yükle</h4>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={handleImageUpload}
                  className="upload-input"
                  id="file-input"
                />

                <div>
                  <label
                    htmlFor="file-input"
                    style={{
                      cursor: "pointer",
                      display: "inline-block",
                      padding: "10px",
                      backgroundColor: "#104b73",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    PDF Seç
                  </label>
                </div>
              </div>

              <div className="images-preview-container">
                {images.map((image, index) => {
                  return (
                    <div key={index} className="image-container">
                      <img src={pdfImg} alt={`Uploaded Preview ${index}`} />
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemoveImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="uploader-container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
                className="baslikAndButton"
              >
                <h4>Kapak Fotoğrafı Yükle</h4>
                <input
                  type="file"
                  accept="image/*"
                  className="upload-input"
                  id="kapakFoto"
                  onChange={handleKapakImageChange}
                  style={{ display: "none" }}
                />

                <div>
                  <label
                    htmlFor="kapakFoto"
                    style={{
                      cursor: "pointer",
                      display: "inline-block",
                      padding: "10px",
                      backgroundColor: "#104b73",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                  >
                    {imgKapak ? "Resiim Değiştir" : "Resim Seç"}
                  </label>
                </div>
              </div>

              {imgKapak && (
                <div className="images-preview-container">
                  <div
                    className="image-container"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={URL.createObjectURL(imgKapak)}
                      alt="Kapak"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                    <button
                      className="remove-button"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "red",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      type="button"
                      onClick={handleKapakRemoveImage}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label>
                Ürün İsmi:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Kategori:
                <select
                  onChange={handleChange}
                  name="categoryName"
                  value={formData.categoryName}
                >
                  <option value="">Seri Seçiniz</option>
                  <option value="genel">Genel Temizlik Ve Hijyen Grubu</option>
                  <option value="mutfak">
                    Mutfak Temizlik Ve Hijyen Grubu
                  </option>
                  <option value="camasir">
                    Çamaşır Temizlik Ve Hijyen Grubu
                  </option>
                  <option value="kisisel">Kişisel Bakım Ve Hijyen Grubu</option>
                  <option value="bina">Bina Temizlik Ve Bakım Grubu</option>
                  <option value="dezenfektan">Dezenfektan Ürünleri</option>
                  <option value="ototemizlik">Oto Temizlik Grubu</option>
                  <option value="temizlikaraclari">Temizlik Araçları</option>
                  <option value="copkovalari">Çöp Kovaları</option>

                  <option value="kagithavludispenserleri">
                    Kağıt Havlu Dispenserleri
                  </option>
                  <option value="tuvaletkagitdispenserleri">
                    Tuvalet Kağıt Dispenserleri
                  </option>
                  <option value="kokulandirmasistemi">
                    Kokulandırma Sistemleri
                  </option>
                  <option value="klozetkapak">
                    Hijyenik Klozet Kapak Sistemleri
                  </option>

                  <option value="paket">Paketleme Ürünleri</option>
                  <option value="kagit">Sarf Kağıt Malz.</option>
                  <option value="atik">Atık Malz.</option>
                  <option value="baski">Baskılı Sarf Malz.</option>
                  <option value="koruyucu">Kişisel Koruyucu Ekip.</option>
                  <option value="temizlikaraclari">DreamPool Ürünleri</option>
                </select>
                <input type="hidden" name="type" value="bake" />
              </label>
            </div>

            <div>
              <label>
                Kısa Açıklama:
                <textarea
                  name="titleContent"
                  value={formData.titleContent}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="buttonContainer">
              <button type="submit">Ürün Ekle</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProjeEkle;
