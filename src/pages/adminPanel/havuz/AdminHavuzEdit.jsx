import { useEffect, useRef, useState } from "react";
import "./AdminHavuzCreate.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useDispatch, useSelector } from "react-redux";
import CategorySingleDown from "./CategorySingleDown";
import { getPools, updatePool } from "../../../redux/slices/poolSlice";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";
import Loading from "../../loading/Loading";

const AdminHavuzEdit = () => {
  const dispatch = useDispatch();
  const { pools, selectedPool } = useSelector((state) => state.poolSlice);
  const [initialCoverImage, setInitialCoverImage] = useState(null);
  const [initialImages, setInitialImages] = useState([]);
  const [initialFormData, setInitialFormData] = useState({
    id: "",
    name: "",
    description: "",
    address: "",
    addressUrl: "",
    images: [],
    coverImage: "",
  });
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    address: "",
    addressUrl: "",
    images: [],
    coverImage: "",
  });
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getPools());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPool) {
      setInitialFormData({
        id: selectedPool.id || "",
        name: selectedPool.name || "",
        description: selectedPool.description || "",
        address: selectedPool.address || "",
        addressUrl: selectedPool?.addressUrl || "",
        images: selectedPool.images || [],
        coverImage: selectedPool.coverImage?.url || "",
      });
      setFormData({
        id: selectedPool.id || "",
        name: selectedPool.name || "",
        description: selectedPool.description || "",
        address: selectedPool.address || "",
        addressUrl: selectedPool?.addressUrl || "",
        images: selectedPool.images || [],
        coverImage: selectedPool.coverImage?.url || "",
      });
      setInitialImages(selectedPool?.images);
      setInitialCoverImage(selectedPool?.coverImage?.url || "");
    }
  }, [selectedPool]);

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

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleSubmitDuzenlePool = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(
        updatePool({ formData, initialCoverImage, initialImages })
      ).unwrap();
      dispatch(getPools());
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Havuz Başarıyla Düzenlendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.message || "Havuz Düzenlenemedi",
          status: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Havuz Düzenle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmitDuzenlePool} className="havuzCreateForm">
          <label className="secilenBolum">
            Hoca Seç:
            <CategorySingleDown pools={pools} selectedPool={selectedPool} />
          </label>

          {selectedPool && (
            <div className="havuzCreate">
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
                        {formData.images.map((image, index) => {
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
                  <button
                    disabled={
                      JSON.stringify(formData) ===
                      JSON.stringify(initialFormData)
                    }
                    className={
                      JSON.stringify(formData) ===
                      JSON.stringify(initialFormData)
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
        </form>
      )}
    </div>
  );
};

export default AdminHavuzEdit;
