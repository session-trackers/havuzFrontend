import { useRef, useState } from "react";
import "./AdminHavuzCreate.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Loading from "../../loading/Loading";
import { useDispatch } from "react-redux";
import { apiCreatePool } from "../../../api/apiPool";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const AdminHavuzCreate = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    addressUrl: "",
    images: [],
    coverImage: "",
  });

  const inputRef = useRef(null);

  const handleClick = (e) => {
    if (
      !e.target.closest(".image-container") &&
      !e.target.closest(".remove-button")
    ) {
      inputRef.current.click();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, coverImage: file });
    event.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("addressUrl", formData.addressUrl);
    formData?.images.forEach((image) => formDataToSend.append("images", image));
    if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage);
    }

    try {
      await apiCreatePool(formDataToSend);
      setFormData({
        name: "",
        description: "",
        address: "",
        addressUrl: "",
        images: [],
        coverImage: "",
      });

      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Havuz Oluşturuldu",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.message || "Havuz Oluşturulamadı",
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
        <form onSubmit={handleSubmit} className="havuzCreate">
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
                {formData.coverImage ? (
                  <img
                    className="kapakImgg"
                    src={URL.createObjectURL(formData.coverImage)}
                    alt="kapakResmi"
                  />
                ) : (
                  <div className="Text">
                    <ImageSearchIcon />
                    Kapak Resmi
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="rightSection">
            <div className="avatarResimler">
              <input
                type="file"
                accept="image/*"
                className="upload-input"
                multiple
                id="file-input"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                ref={inputRef}
              />

              <div onClick={handleClick} className="kapsayiciButton">
                {formData.images.length > 0 ? (
                  <div className="images-preview-container">
                    {formData.images.map((image, index) => {
                      return (
                        <div key={index} className="image-container">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded Preview ${index}`}
                          />
                          <button
                            type="button"
                            className="remove-button"
                            onClick={(event) => {
                              event.stopPropagation(); // silerken input açılmasın
                              handleRemoveImage(index);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="Text">
                    <ImageSearchIcon />
                    Havuz Resimlerini Ekle
                  </div>
                )}
              </div>
            </div>

            <label>
              Havuz İsmi:
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
              Konum:
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>
            <label>
              Konum Linki:
              <textarea
                name="addressUrl"
                value={formData.addressUrl}
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
