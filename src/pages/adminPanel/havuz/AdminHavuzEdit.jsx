import { useEffect, useMemo, useState } from "react";
import "./AdminHavuzCreate.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import CategorySingleDown from "./CategorySingleDown";
import {
  getPools,
  removePool,
  updatePool,
} from "../../../redux/slices/poolSlice";

const AdminHavuzEdit = () => {
  const dispatch = useDispatch();
  const { pools, selectedPool } = useSelector((state) => state.poolSlice);
  const [showPopupHavuz, setShowPopupHavuz] = useState(false);
  const [initialKapakImages, setInitialKapakImages] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    coverImage: "",
    name: "",
    description: "",
    konum: "",
    konumLink: "",
  });

  useEffect(() => {
    dispatch(getPools());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPool) {
      setFormData(selectedPool);
      setInitialKapakImages(selectedPool?.coverImage?.url || "");
    }
  }, [selectedPool]);

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

  const handleSubmitDuzenlePool = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePool({ formData, initialKapakImages })).unwrap();
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

  const handleConfirmDeleteHavuz = async (e) => {
    e.preventDefault();
    try {
      await dispatch(removePool(formData.id)).unwrap();
      setShowPopupHavuz(false);
      dispatch(
        showAlertWithTimeout({
          message: "Havuz başarıyla silindi",
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
        <h4>Havuz Düzenle</h4>
        <hr />
      </div>

      <form onSubmit={handleSubmitDuzenlePool} className="category-form">
        <label className="secilenBolum">
          Havuz Seç:
          <CategorySingleDown pools={pools} selectedPool={selectedPool} />
        </label>

        {!selectedPool && (
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
                      alt="Havuz Kapak"
                    />
                  ) : (
                    <div className="Text">
                      <ImageSearchIcon />
                      Havuz Resmi Ekle
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
                  name="konum"
                  value={formData.konum}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Konum Link:
                <textarea
                  name="konumLink"
                  value={formData.konumLink}
                  onChange={handleChange}
                  required
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
                    setShowPopupHavuz(true);
                  }}
                  className="delete"
                >
                  Sil
                </button>

                <button
                  disabled={
                    !(
                      selectedPool?.categoryName !== formData.name ||
                      selectedPool?.categoryDescription !==
                        formData.description ||
                      formData.coverImage instanceof File
                    )
                  }
                  className={
                    !(
                      selectedPool?.categoryName !== formData.name ||
                      selectedPool?.categoryDescription !==
                        formData.description ||
                      formData.coverImage instanceof File
                    )
                      ? "disabled"
                      : ""
                  }
                  type="submit"
                >
                  Havuz Düzenle
                </button>
              </div>
            </div>
          </div>
        )}

        {showPopupHavuz && (
          <div className="popup">
            <div className="popup-inner">
              <p>Silmek istediğinize emin misiniz?</p>
              <div className="popup-buttons">
                <button
                  className="cancel"
                  type="button"
                  onClick={() => {
                    setShowPopupHavuz(false);
                  }}
                >
                  İptal
                </button>
                <button
                  type="button"
                  className="confirm"
                  onClick={handleConfirmDeleteHavuz}
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

export default AdminHavuzEdit;
