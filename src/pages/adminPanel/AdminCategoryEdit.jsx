import { useEffect, useState } from "react";
import "./AdminCategoryEdit.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Loading from "../loading/Loading";

const AdminCategoryEdit = () => {
  const token = localStorage.getItem("authToken");

  const [imgKapak, setImgKapak] = useState(null);
  const [formData, setFormData] = useState({ categoryName: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/category`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setImgKapak(file);
  };

  const handleChangeSelectedCategory = async (id) => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/category/get-by-id?id=${id}`
      );
      setSelectedCategory(response.data);
      setImgKapak(response.data.coverImage?.filename || null);
      setFormData({ categoryName: response.data.name });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    if (!selectedCategory) {
      alert("Lütfen bir kategori seçiniz.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (selectedCategory.name !== formData.categoryName) {
        const response = await axios.put(
          `${BASE_URL}/api/v1/category?id=${selectedCategory.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Eğer kapak görseli değiştiyse güncelle
      if (imgKapak && imgKapak instanceof File) {
        const kapakData = new FormData();
        kapakData.append("image", imgKapak);
        kapakData.append("id", selectedCategory.id);

        await axios.post(`${BASE_URL}/api/v1/image/category`, kapakData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setFormData({ categoryName: "" });
      setImgKapak(null);
      setSelectedCategory(null);
      await fetchCategories();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderImage = (img) => {
    if (typeof img === "string") return img;
    if (img instanceof File) return URL.createObjectURL(img);
    return null;
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Kategori Düzenle</h4>
        <hr />
      </div>

      {isFetching || isSubmitting ? (
        <Loading />
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label className="secilenBolum">
            Kategori:
            <select
              onChange={(e) => handleChangeSelectedCategory(e.target.value)}
              value={selectedCategory ? selectedCategory.id : ""}
            >
              <option disabled value="">
                Kategori Seçiniz
              </option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          {selectedCategory && (
            <div className="categoryEdit">
              <div className="leftSide">
                <div className="avatar">
                  <input
                    type="file"
                    accept="image/*"
                    id="kapakFoto"
                    onChange={handleKapakImageChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="kapakFoto" className="kapsayiciButton">
                    {renderImage(imgKapak) ? (
                      <img
                        className="kapakImgg"
                        src={renderImage(imgKapak)}
                        alt="Kategori Kapak"
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
                  <button
                    disabled={
                      !(
                        selectedCategory.name !== formData.categoryName ||
                        imgKapak instanceof File
                      )
                    }
                    className={
                      !(
                        selectedCategory.name !== formData.categoryName ||
                        imgKapak instanceof File
                      )
                        ? "disabled"
                        : ""
                    }
                    type="submit"
                  >
                    Kategori Düzenle
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

export default AdminCategoryEdit;
