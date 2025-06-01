import { useState } from "react";
import "./AdminHocaCreate.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Loading from "../../loading/Loading";
import { useDispatch } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import { apiCreateHoca } from "../../../api/apiKadro";

const AdminHocaCreate = () => {
  const dispatch = useDispatch();
  const [imgKapak, setImgKapak] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    unvan: "",
  });

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
    setIsloading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.categoryName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("unvan", formData.unvan);
    formDataToSend.append("image", imgKapak);

    try {
      await apiCreateHoca(formDataToSend);
      setFormData({ categoryName: "", description: "", unvan: "" });
      setImgKapak(null);
      dispatch(
        showAlertWithTimeout({
          message: "Hoca başarıyla güncellendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: error.message || "Hata",
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
        <h4>Hoca Ekle</h4>
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
                    Hocanın Resmini Ekle
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="rightSection">
            <label>
              Hoca İsmi:
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Hoca Ünvanı:
              <input
                type="text"
                name="unvan"
                value={formData.unvan}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Açıklama:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <div className="buttonContainer">
              <button type="submit">Hoca Ekle</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminHocaCreate;
