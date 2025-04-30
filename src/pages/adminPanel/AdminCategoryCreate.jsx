import { useState } from "react";
import "./AdminCategoryCreate.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Loading from "../loading/Loading";

const AdminCategoryCreate = () => {
  const token = localStorage.getItem("authToken");
  const [imgKapak, setImgKapak] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: "",
  });
  const [isLoading, setIsloading] = useState(false);

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setImgKapak(file);
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
    window.scrollTo(0, 0); // Sayfa her değiştiğinde en üst konuma kaydırma
    setIsloading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header'ı ekleyin
          },
        }
      );

      if (response.status === 201) {
        if (imgKapak) {
          const kapakData = new FormData();
          kapakData.append("image", imgKapak);
          kapakData.append("id", response.data.id);

          const kapakImages = await axios.post(
            `${BASE_URL}/api/v1/image/category`,
            kapakData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      }

      setTimeout(() => {
        setFormData({ categoryName: "" });
        setImgKapak(null);
        setIsloading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Kategori Ekle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="categoryCreate">
          <div className="leftSide">
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
                {imgKapak ? (
                  <img
                    className="kapakImgg"
                    src={URL.createObjectURL(imgKapak)}
                    alt="kapakResmi"
                  />
                ) : (
                  <div className="Text">
                    <ImageSearchIcon />
                    Kategori Resmi Ekle
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="rightSection">
            <label>
              Kategori İsmi:
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <div className="buttonContainer">
              <button type="submit">Kategori Ekle</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminCategoryCreate;
