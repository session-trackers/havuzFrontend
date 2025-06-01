import { useState } from "react";
import "./AdminSessionZ.scss";

import Loading from "../../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import { apiCreateHoca } from "../../../api/apiKadro";

const AdminSessionCreate = () => {
  const dispatch = useDispatch();
  const { kadro } = useSelector((state) => state.kadroSlice);
  const { pools } = useSelector((state) => state.poolSlice);

  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    sessionName: "",
    repeatDay: "",
    startHour: "",
    endHour: "",
    selectedPoolId: "",
    selectedBasAntrenorIds: [],
    selectedKondisyonersIds: [],
    selectedAlanSorumlusuIds: [],
    selectedCankurtaransIds: [],
    selectedAntrenorsIds: [],
    selectedStajyerAntrenorsIds: [],
    startDate: "",
    endDate: "",
    sessionDescription: "",
  });

  const handleChange = (e) => {
    const { name, value, multiple, options } = e.target;
    if (multiple) {
      const values = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prev) => ({
        ...prev,
        [name]: values,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.categoryName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("unvan", formData.unvan);

    try {
      await apiCreateHoca(formDataToSend);
      setFormData({ categoryName: "", description: "", unvan: "" });

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
        <h4>Seans Ekle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="sessionCreate">
          <div className="leftSide avatar">
            <label>
              Seans İsmi:
              <input
                type="text"
                name="sessionName"
                value={formData.sessionName}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Gün
              <select
                value={formData.day}
                onChange={handleChange}
                required
                name="day"
              >
                <option disabled value="">
                  Gün Seç
                </option>

                <option value={"pazartesi"}>Pazartesi</option>
                <option value={"sali"}>Salı</option>
                <option value={"carsamba"}>Çarşamba</option>
                <option value={"persembe"}>Perşembe</option>
                <option value={"cuma"}>Cuma</option>
                <option value={"cumartesi"}>Cumartesi</option>
                <option value={"pazar"}>Pazar</option>
              </select>
            </label>

            <div className="range-picker">
              <div className="field">
                <label>Başlangıç</label>
                <input
                  type="time"
                  name="startHour"
                  value={formData.startHour}
                  onChange={handleChange}
                />
              </div>
              <div className="divider">—</div>

              <div className="field">
                <label>Bitiş</label>
                <input
                  type="time"
                  name="endHour"
                  value={formData.endHour}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="rightSection avatar">
            <label>
              Havuz
              <select
                value={formData.selectedPoolId}
                onChange={handleChange}
                required
                name="selectedPoolId"
              >
                <option disabled value="">
                  Havuz Seç
                </option>

                {pools?.map((pool) => (
                  <option key={pool.id} value={pool.id}>
                    {pool.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Baş Antrenörler
              <select
                value={formData.selectedBasAntrenorIds}
                onChange={handleChange}
                required
                name="selectedBasAntrenorIds"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {kadroItem.categoryName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Kondisyonerler
              <select
                value={formData.selectedKondisyonersIds}
                onChange={handleChange}
                required
                name="selectedKondisyonersIds"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {kadroItem.categoryName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Alan Sorumluları
              <select
                value={formData.selectedAlanSorumlusuIds}
                onChange={handleChange}
                required
                name="selectedAlanSorumlusuIds"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {kadroItem.categoryName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Cankurtaranlar
              <select
                value={formData.selectedCankurtaransIds}
                onChange={handleChange}
                required
                name="selectedCankurtaransIds"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {kadroItem.categoryName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Antrenörler
              <select
                value={formData.selectedAntrenorsIds}
                onChange={handleChange}
                required
                name="selectedAntrenorsIds"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {kadroItem.categoryName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Stajyer Antrenörler
              <select
                value={formData.selectedStajyerAntrenorsIds}
                onChange={handleChange}
                required
                name="selectedStajyerAntrenorsIds"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {kadroItem.categoryName}
                  </option>
                ))}
              </select>
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

            <div className="range-picker">
              <div className="field">
                <label>Başlangıç</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="divider">—</div>
              <div className="field">
                <label>Bitiş</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="buttonContainer">
              <button type="submit">Seans Ekle</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminSessionCreate;
