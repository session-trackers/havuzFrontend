import { useState } from "react";
import "./AdminHavuzCreate.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Loading from "../../loading/Loading";
import { useDispatch } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import { apiCreatePool } from "../../../api/apiPool";

const AdminHavuzCreate = () => {
  const dispatch = useDispatch();
  const [imgKapak, setImgKapak] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    konum: "",
    konumLink: "",
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
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", imgKapak);

    try {
      await apiCreatePool(formDataToSend);
      setFormData({ name: "", description: "" });
      setImgKapak(null);
      dispatch(
        showAlertWithTimeout({
          message: "Havuz başarıyla güncellendi",
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
        <h4>Havuz Ekle</h4>
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
                    Havuzun Resmini Ekle
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="rightSection">
            <label>
              Havuz İsmi:
              <input
                type="text"
                name="categoryName"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Konum:
              <textarea
                name="konum"
                value={formData.konum}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>
            <label>
              Konum Linki:
              <textarea
                name="konumLink"
                value={formData.konumLink}
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
              <button type="submit">Havuz Ekle</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminHavuzCreate;
