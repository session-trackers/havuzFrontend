import { useEffect, useMemo, useState } from "react";
import "./AdminHocaEdit.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useDispatch, useSelector } from "react-redux";
import CategorySingleDown from "./CategorySingleDown";
import {
  getKadro,
  removeHoca,
  updateHoca,
} from "../../../redux/slices/kadroSlice";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";

const AdminHocaEdit = () => {
  const dispatch = useDispatch();
  const { kadro, selectedHoca } = useSelector((state) => state.kadroSlice);
  const [showPopupHoca, setShowPopupHoca] = useState(false);
  const [initialKapakImages, setInitialKapakImages] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    unvan: "",
  });

  useEffect(() => {
    dispatch(getKadro());
  }, [dispatch]);

  useEffect(() => {
    if (selectedHoca) {
      setFormData(selectedHoca);
      setInitialKapakImages(selectedHoca?.coverImage?.url || "");
    }
  }, [selectedHoca]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, coverImage: file });
    event.target.value = "";
  };

  const handleSubmitDuzenleHoca = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateHoca({ formData, initialKapakImages })).unwrap();
      dispatch(
        showAlertWithTimeout({
          message: "Hoca başarıyla güncellendi",
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

  const handleConfirmDeleteHoca = async (e) => {
    e.preventDefault();
    try {
      await dispatch(removeHoca(formData.id)).unwrap();
      setShowPopupHoca(false);
      dispatch(
        showAlertWithTimeout({
          message: "Hoca başarıyla silindi",
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

  const renderedImage = useMemo(() => {
    if (typeof formData.coverImage === "string") return formData.coverImage;
    if (formData.coverImage instanceof File)
      return URL.createObjectURL(formData.coverImage);
    return null;
  }, [formData.coverImage]);

  return (
    <div className="projeList">
      <div className="title">
        <h4>Hoca Düzenle</h4>
        <hr />
      </div>

      <form onSubmit={handleSubmitDuzenleHoca} className="category-form">
        <label className="secilenBolum">
          Hoca Seç:
          <CategorySingleDown kadro={kadro} selectedHoca={selectedHoca} />
        </label>

        {!selectedHoca && (
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
                  {renderedImage ? (
                    <img
                      className="kapakImgg"
                      src={renderedImage}
                      alt="Hoca Kapak"
                    />
                  ) : (
                    <div className="Text">
                      <ImageSearchIcon />
                      Hoca Resmi Ekle
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
                Ünvanı:
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
                />
              </label>

              <div className="buttonContainer">
                <button
                  type="button"
                  onClick={() => {
                    setShowPopupHoca(true);
                  }}
                  className="delete"
                >
                  Sil
                </button>

                <button
                  disabled={
                    !(
                      selectedHoca?.categoryName !== formData.name ||
                      selectedHoca?.categoryDescription !==
                        formData.description ||
                      formData.coverImage instanceof File
                    )
                  }
                  className={
                    !(
                      selectedHoca?.categoryName !== formData.name ||
                      selectedHoca?.categoryDescription !==
                        formData.description ||
                      formData.coverImage instanceof File
                    )
                      ? "disabled"
                      : ""
                  }
                  type="submit"
                >
                  Hoca Düzenle
                </button>
              </div>
            </div>
          </div>
        )}

        {showPopupHoca && (
          <div className="popup">
            <div className="popup-inner">
              <p>Silmek istediğinize emin misiniz?</p>
              <div className="popup-buttons">
                <button
                  className="cancel"
                  type="button"
                  onClick={() => {
                    setShowPopupHoca(false);
                  }}
                >
                  İptal
                </button>
                <button
                  type="button"
                  className="confirm"
                  onClick={handleConfirmDeleteHoca}
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        )}

        {showPopupHoca && (
          <div className="popup">
            <div className="popup-inner">
              <p>Silmek istediğinize emin misiniz?</p>
              <div className="popup-buttons">
                <button
                  className="cancel"
                  type="button"
                  onClick={() => {
                    setShowPopupHoca(false);
                  }}
                >
                  İptal
                </button>
                <button
                  type="button"
                  className="confirm"
                  onClick={handleConfirmDeleteHoca}
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminHocaEdit;
