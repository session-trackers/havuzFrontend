import { useEffect, useState } from "react";
import "./AdminSessionZ.scss";

import Loading from "../../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import { getKadro } from "../../../redux/slices/kadroSlice";
import { getPools } from "../../../redux/slices/poolSlice";
import { apiCreateSeans } from "../../../api/apiSeans";

const AdminSessionCreate = () => {
  const dispatch = useDispatch();
  const { kadro } = useSelector((state) => state.kadroSlice);
  const { pools } = useSelector((state) => state.poolSlice);

  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dayOfWeek: "",
    startHour: "",
    endHour: "",
    pool: "",
    headCoach: [],
    conditioner: [],
    areaSupervisor: [],
    lifeguard: [],
    coach: [],
    internCoach: [],
    startDate: "",
    endDate: "",
    description: "",
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

    const formatDateTime = (date, time) => {
      // Eğer saat seçilmemişse varsayılan olarak 00:00:00
      const fullTime = time ? `${time}:00` : "00:00:00";
      return `${date}T${fullTime}`;
    };

    const payload = {
      ...formData,
      startDate: formatDateTime(formData.startDate, formData.startHour),
      endDate: formatDateTime(formData.endDate, formData.endHour),
      startHour: `${formData.startHour}:00`,
      endHour: `${formData.endHour}:00`,
    };

    try {
      await apiCreateSeans(payload);

      setFormData({
        name: "",
        dayOfWeek: "",
        startHour: "",
        endHour: "",
        pool: "",
        headCoach: [],
        conditioner: [],
        areaSupervisor: [],
        lifeguard: [],
        coach: [],
        internCoach: [],
        startDate: "",
        endDate: "",
        description: "",
      });

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

  useEffect(() => {
    dispatch(getKadro());
    dispatch(getPools());
  }, [dispatch]);

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
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </label>

            <label>
              Gün
              <select
                value={formData.dayOfWeek}
                onChange={handleChange}
                required
                name="dayOfWeek"
              >
                <option disabled value="">
                  Gün Seç
                </option>
                <option value={"MONDAY"}>Pazartesi</option>
                <option value={"TUESDAY"}>Salı</option>
                <option value={"WEDNESDAY"}>Çarşamba</option>
                <option value={"THURSDAY"}>Perşembe</option>
                <option value={"FRIDAY"}>Cuma</option>
                <option value={"SATURDAY"}>Cumartesi</option>
                <option value={"SUNDAY"}>Pazar</option>
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
                value={formData.pool}
                onChange={handleChange}
                required
                name="pool"
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
                value={formData.headCoach}
                onChange={handleChange}
                required
                name="headCoach"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {`${kadroItem.name} ${kadroItem.lastName} - ${kadroItem.title}`}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Kondisyonerler
              <select
                value={formData.conditioner}
                onChange={handleChange}
                required
                name="conditioner"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {`${kadroItem.name} ${kadroItem.lastName} - ${kadroItem.title}`}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Alan Sorumluları
              <select
                value={formData.areaSupervisor}
                onChange={handleChange}
                required
                name="areaSupervisor"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {`${kadroItem.name} ${kadroItem.lastName} - ${kadroItem.title}`}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Cankurtaranlar
              <select
                value={formData.lifeguard}
                onChange={handleChange}
                required
                name="lifeguard"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {`${kadroItem.name} ${kadroItem.lastName} - ${kadroItem.title}`}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Antrenörler
              <select
                value={formData.coach}
                onChange={handleChange}
                required
                name="coach"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {`${kadroItem.name} ${kadroItem.lastName} - ${kadroItem.title}`}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Stajyer Antrenörler
              <select
                value={formData.internCoach}
                onChange={handleChange}
                required
                name="internCoach"
                multiple
              >
                <option disabled value="">
                  Hoca Seç
                </option>

                {kadro?.map((kadroItem) => (
                  <option key={kadroItem.id} value={kadroItem.id}>
                    {`${kadroItem.name} ${kadroItem.lastName} - ${kadroItem.title}`}
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
