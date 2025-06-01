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
    name: "",
    lastName: "",
    username: "",
    description: "",
    phoneNo: "",
    title: "",
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
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("phoneNo", formData.phoneNo);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("coverImage", imgKapak);

    try {
      await apiCreateHoca(formDataToSend);
      setFormData({
        name: "",
        lastName: "",
        username: "",
        description: "",
        phoneNo: "",
        title: "",
      });
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Hoca Soyadı:
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
              Hoca Mail:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Hoca Telefon:
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Hoca Ünvanı:
              <input
                type="text"
                name="title"
                value={formData.title}
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
