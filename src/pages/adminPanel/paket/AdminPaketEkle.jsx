import { useEffect, useRef, useState } from "react";
import "./AdminPaketDuzenle.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Loading from "../../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  getSeansesList,
  getSeansesNoList,
} from "../../../redux/slices/seansSlice";
import { apiCreatePaket } from "../../../api/apiPaket";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const AdminPaketEkle = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isLoading, setIsloading] = useState(false);
  const [seanses, setSeanses] = useState([]);
  const [formData, setFormData] = useState({
    coverImage: "",
    images: [],
    color: "",
    name: "",
    price: "",
    capacity: "",
    description: "",
    longDescription: "",
    public: false,
    sessions: [],
    selectedGroups: [],
  });

  useEffect(() => {
    const fetchBAse = async () => {
      setIsloading(true);
      try {
        const data = await dispatch(getSeansesNoList()).unwrap();
        setSeanses(data);
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response?.data || "Hata",
            status: "error",
          })
        );
      } finally {
        setIsloading(false);
      }
    };

    fetchBAse();
  }, [dispatch]);

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
    } else if (name === "public") {
      setFormData({
        ...formData,
        public: value === "true",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formData?.images?.forEach((image) =>
      formDataToSend.append("images", image)
    );
    if (formData?.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage);
    }
    formDataToSend.append("capacity", formData.capacity);
    formDataToSend.append("color", formData.color);
    formData?.sessions?.forEach((id) => formDataToSend.append("sessions", id));
    formDataToSend.append("price", formData.price);
    formDataToSend.append("longDescription", formData.longDescription);
    formDataToSend.append("public", formData.public);

    try {
      await apiCreatePaket(formDataToSend);
      setFormData({
        coverImage: "",
        images: [],
        color: "",
        name: "",
        price: "",
        capacity: "",
        description: "",
        longDescription: "",
        public: true,
        sessions: [],
        selectedGroups: [],
      });

      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Paket Eklendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response?.data || "Hata",
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
        <h4>Paket Ekle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="paketCreate">
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
                    {formData?.images?.map((image, index) => (
                      <div key={index} className="image-container">
                        <img
                          src={URL.createObjectURL(image)}
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
                name="public"
                value={formData.public.toString()}
                onChange={handleChange}
              >
                <option value="true">Evet</option>
                <option value="false">Hayır</option>
              </select>
            </label>

            <label>
              Seans Grupları
              <select
                name="sessions"
                multiple
                onChange={handleChange}
                value={formData.selectedGroups.map((group) =>
                  JSON.stringify(group)
                )}
                required
              >
                <option disabled value="">
                  Seans Grubu Seç
                </option>

                {seanses?.map((seans) => (
                  <option key={seans.groupId} value={JSON.stringify(seans.ids)}>
                    {seans.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="buttonContainer">
              <button type="submit">Paket Ekle</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminPaketEkle;
