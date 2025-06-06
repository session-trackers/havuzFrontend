import { useEffect, useRef, useState } from "react";
import "./AdminPaketDuzenle.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Loading from "../../loading/Loading";
import { useDispatch } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";

import {
  getPaketByPaketId,
  updatePaket,
} from "../../../redux/slices/paketSlice";
import { useParams } from "react-router-dom";

const AdminPaketDuzenle = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const inputRef = useRef(null);
  const [submited, setSubmited] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    coverImage: "",
    images: [],
    color: "",
    name: "",
    price: "",
    capacity: "",
    description: "",
  });
  const [initialFormData, setInitialFormData] = useState({
    id: "",
    coverImage: "",
    images: [],
    color: "",
    name: "",
    price: "",
    capacity: "",
    description: "",
  });

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await dispatch(getPaketByPaketId(id)).unwrap();
        setFormData({
          id: response?.id || "",
          coverImage: response?.coverImage?.url || "",
          images: response?.images || "",
          color: response?.color || "",
          name: response?.name || "",
          price: response?.price || "",
          capacity: response?.capacity || "",
          description: response?.description || "",
        });

        setInitialFormData({
          id: response?.id || "",
          coverImage: response?.coverImage?.url || "",
          images: response?.images || "",
          color: response?.color || "",
          name: response?.name || "",
          price: response?.price || "",
          capacity: response?.capacity || "",
          description: response?.description || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchFunc();
  }, [dispatch, submited]);

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

    if (["price", "capacity"].includes(name)) {
      if (!/^\d*$/.test(value)) return;
    }

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

  const handleSubmitDuzenlePaket = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updatePaket({
          formData,
          initialCoverImage: initialFormData?.coverImage?.url,
          initialImages: initialFormData.images,
        })
      ).unwrap();
      setSubmited((prev) => !prev);
      dispatch(
        showAlertWithTimeout({
          message: "Havuz başarıyla güncellendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: error.message,
          status: "error",
        })
      );
    }
  };

  console.log(formData);

  return (
    <div className="projeList">
      <div className="title">
        <h4>Paket Düzenle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmitDuzenlePaket} className="paketCreate">
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
                    src={
                      typeof formData.coverImage === "string"
                        ? formData.coverImage
                        : URL.createObjectURL(formData.coverImage)
                    }
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
                    {formData?.images?.map((image, index) => {
                      return (
                        <div key={index} className="image-container">
                          <img
                            src={
                              image?.url
                                ? image.url
                                : typeof image === "string"
                                ? image
                                : URL.createObjectURL(image)
                            }
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
                    Paket Resimlerini Ekle
                  </div>
                )}
              </div>
            </div>

            <label>
              Renk Seçin:
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Paket İsmi:
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
              Paket Fiyatı:
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Kontenjan:
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
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
                Havuz Düzenle
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminPaketDuzenle;
