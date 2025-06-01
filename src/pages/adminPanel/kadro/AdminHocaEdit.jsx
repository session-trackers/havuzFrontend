import { useEffect, useMemo, useState } from "react";
import "./AdminHocaEdit.scss";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useDispatch, useSelector } from "react-redux";
import CategorySingleDown from "./CategorySingleDown";
import { getKadro, updateHoca } from "../../../redux/slices/kadroSlice";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";

const AdminHocaEdit = () => {
  const dispatch = useDispatch();
  const { kadro, selectedHoca } = useSelector((state) => state.kadroSlice);
  const [initialKapakImages, setInitialKapakImages] = useState("");
  const [initialFormData, setInitialFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    username: "",
    description: "",
    phoneNo: "",
    title: "",
    coverImage: "",
  });

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    username: "",
    description: "",
    phoneNo: "",
    title: "",
    coverImage: "",
  });

  -useEffect(() => {
    dispatch(getKadro());
  }, [dispatch]);

  useEffect(() => {
    if (selectedHoca) {
      setFormData({
        id: selectedHoca.id,
        name: selectedHoca.name,
        lastName: selectedHoca.lastName,
        username: selectedHoca.username,
        description: selectedHoca.description,
        phoneNo: selectedHoca.phoneNo,
        title: selectedHoca.title,
        coverImage: selectedHoca.coverImage?.url,
      });
      setInitialFormData({
        id: selectedHoca.id,
        name: selectedHoca.name,
        lastName: selectedHoca.lastName,
        username: selectedHoca.username,
        description: selectedHoca.description,
        phoneNo: selectedHoca.phoneNo,
        title: selectedHoca.title,
        coverImage: selectedHoca.coverImage?.url,
      });

      setInitialKapakImages(selectedHoca?.coverImage?.url || "");
    }
  }, [selectedHoca]);

  console.log(kadro);
  console.log(selectedHoca);

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

        {selectedHoca && (
          <div className="categoryEdit">
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
                  Hoca Düzenle
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
