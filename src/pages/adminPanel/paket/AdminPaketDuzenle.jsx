import { useEffect, useRef, useState } from "react";
import "./AdminPaketDuzenle.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Loading from "../../loading/Loading";
import { useDispatch } from "react-redux";
import {
  getPaketByPaketId,
  updatePaket,
} from "../../../redux/slices/paketSlice";
import { useParams } from "react-router-dom";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

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
    longDescription: "",
    isPublic: false,
  });
  const [initialFormData, setInitialFormData] = useState({ ...formData });

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await dispatch(getPaketByPaketId(id)).unwrap();

        setFormData({
          id: response?.id || "",
          coverImage: response?.coverImage?.url || "",
          images: response?.images || [],
          color: response?.color || "",
          name: response?.name || "",
          price: response?.price || "",
          capacity: response?.capacity || "",
          description: response?.description || "",
          longDescription: response?.longDescription || "",
          isPublic: response?.isPublic ?? false,
        });

        setInitialFormData({
          id: response?.id || "",
          coverImage: response?.coverImage?.url || "",
          images: response?.images || [],
          color: response?.color || "",
          name: response?.name || "",
          price: response?.price || "",
          capacity: response?.capacity || "",
          description: response?.description || "",
          longDescription: response?.longDescription || "",
          isPublic: response?.isPublic ?? false,
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
    const { name, value, type, checked, options } = e.target;

    if (name === "sessions") {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => JSON.parse(option.value));
      const allSessionIds = selectedValues.flat();

      setFormData({
        ...formData,
        selectedGroups: selectedValues,
        sessions: allSessionIds,
      });
    } else {
      if (["price", "capacity"].includes(name)) {
        if (!/^\d*$/.test(value)) return;
      }

      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
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
    setIsloading(true);
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
        showAlertWithTimeoutKullanici({
          message: "Paket Düzenlendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error?.response?.message || "Hata",
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
                    {formData.images.map((image, index) => (
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
                            event.stopPropagation();
                            handleRemoveImage(index);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
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

            <label>
              Uzun Açıklama:
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                autoComplete="off"
              />
            </label>

            <label>
              Yayın Durumu:
              <select
                name="isPublic"
                value={formData.isPublic === true ? "true" : "false"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isPublic: e.target.value === "true",
                  })
                }
              >
                <option value="true">Evet</option>
                <option value="false">Hayır</option>
              </select>
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
                Paket Düzenle
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminPaketDuzenle;
