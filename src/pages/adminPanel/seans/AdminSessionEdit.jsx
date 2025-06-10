import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import SeansSingleDown from "./SeansSingleDown";
import {
  getSeansesFilter,
  setSelectedSeans,
  updateSeans,
} from "../../../redux/slices/seansSlice";
import Loading from "../../loading/Loading";
import { getPools } from "../../../redux/slices/poolSlice";
import { getKadro } from "../../../redux/slices/kadroSlice";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { getStudentsByIdSession } from "../../../redux/slices/studentSlice";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const AdminSessionEdit = () => {
  const dispatch = useDispatch();
  const { seanses, selectedSeans } = useSelector((state) => state.seansSlice);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const { kadro } = useSelector((state) => state.kadroSlice);
  const { pools } = useSelector((state) => state.poolSlice);

  const [calendar, setCalendar] = useState(null);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [stundent, setStundent] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialFormData, setInitialFormData] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    if (!(month == "" || year == "")) {
      dispatch(getSeansesFilter({ year, month }));
      dispatch(getPools());
      dispatch(getKadro());
    }
  }, [year, month, dispatch, isSubmiting]);

  useEffect(() => {
    const generateCalendar = () => {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      const daysInMonth = endDate.getDate();

      const firstDayOfWeek = (startDate.getDay() + 6) % 7; // Haftanın başlangıcını Pazartesi yap
      const totalBoxes = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
      const calendarIc = [];

      for (let i = 0; i < totalBoxes; i++) {
        const day = i - firstDayOfWeek + 1;
        const date = new Date(year, month - 1, day);
        const isValid = day > 0 && day <= daysInMonth;

        const seansForDay = seanses?.filter(
          (seans) =>
            isValid &&
            new Date(seans.date).toDateString() === date.toDateString()
        );

        calendarIc.push({
          date,
          isValid,
          seanses: seansForDay,
        });
      }

      return calendarIc;
    };

    if (!(month == "" || year == "")) {
      setCalendar(generateCalendar());
    }
    setIsOpenEdit(false);
    setIsOpenView(false);
    dispatch(setSelectedSeans(null));
  }, [month, year, seanses]);

  useEffect(() => {
    if (selectedSeans) {
      setFormData(selectedSeans);
      setInitialFormData(selectedSeans);
      setIsOpenView(false);
      setStundent([]);
    }
  }, [selectedSeans]);

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

  const handleSubmitDuzenleSeans = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateSeans({ formData })).unwrap();
      setIsSubmiting((prev) => !prev);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Seanslar Düzenlendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.message,
          status: "error",
        })
      );
    }
  };

  const getAttendanceClass = (attendance) => {
    if (attendance === true) return "attended";
    if (attendance === false) return "absent";
    return "unknown";
  };

  const handleViewStudents = async (id) => {
    try {
      const response = await dispatch(getStudentsByIdSession({ id })).unwrap();
      setStundent(response);
      setIsOpenView(true);
      setTimeout(() => {
        const element = document.getElementById("studentClassess");
        if (element) {
          const headerOffset = 160; // Header yüksekliği
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.message || "Seansta Öğrenci Yok",
          status: "error",
        })
      );
    }
  };

  console.log(selectedSeans);

  return (
    <div className="projeList">
      <div className="title">
        <h4>Seans Düzenle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmitDuzenleSeans}
          className="sessionCreateContent"
        >
          <div className="topSide avatar">
            <div className="dateSelecet">
              <label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  <option value="">Yıl Seçin</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </label>

              <label>
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  <option value="">Ay Seçin</option>
                  <option value="1">Ocak</option>
                  <option value="2">Şubat</option>
                  <option value="3">Mart</option>
                  <option value="4">Nisan</option>
                  <option value="5">Mayıs</option>
                  <option value="6">Haziran</option>
                  <option value="7">Temmmuz</option>
                  <option value="8">Ağustos</option>
                  <option value="9">Eylül</option>
                  <option value="10">Ekim</option>
                  <option value="11">Kasım</option>
                  <option value="12">Aralık</option>
                </select>
              </label>
            </div>

            {!(month == "" || year == "") && (
              <div className="takvim">
                <div className="headerTakvim">
                  {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(
                    (gun) => (
                      <div key={gun} className="gun">
                        {gun}
                      </div>
                    )
                  )}
                </div>

                <div className="grid">
                  {calendar?.map((day, index) => (
                    <div
                      key={index}
                      className={`gun-kutu ${day.isValid ? "aktif" : "pasif"}`}
                    >
                      {day.isValid && (
                        <>
                          <div className="tarih">{day.date.getDate()}</div>
                          <div className="seanslar">
                            {day.seanses?.map((seans, i) => (
                              <div
                                onClick={() =>
                                  dispatch(setSelectedSeans(seans))
                                }
                                key={i}
                                className={
                                  selectedSeans?.id === seans?.id
                                    ? "seans selected"
                                    : "seans"
                                }
                                style={{ backgroundColor: seans.color }}
                              >
                                {seans.startHour} - {seans.endHour} <br />
                                {seans.name}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {selectedSeans && (
                  <div className="buttonContainer">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpenEdit(true);
                      }}
                    >
                      Düzenle
                    </button>

                    <button
                      type="button"
                      className="gor"
                      onClick={() => handleViewStudents(selectedSeans.id)}
                    >
                      Öğrencileri Gör
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {selectedSeans && isOpenEdit && (
            <div className="sessionCreate">
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
                        {`${kadroItem.name} - ${kadroItem.lastName} - ${kadroItem.title}`}
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
                        {`${kadroItem.name} - ${kadroItem.lastName} - ${kadroItem.title}`}
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
                        {`${kadroItem.name} - ${kadroItem.lastName} - ${kadroItem.title}`}
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
                        {`${kadroItem.name} - ${kadroItem.lastName} - ${kadroItem.title}`}
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
                        {`${kadroItem.name} - ${kadroItem.lastName} - ${kadroItem.title}`}
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
                        {`${kadroItem.name} - ${kadroItem.lastName} - ${kadroItem.title}`}
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

                <div className="fieldDuzenle">
                  <label>
                    Tarihi:
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </label>
                </div>

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
                    Seansı Düzenle
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedSeans && isOpenView && (
            <div id="studentClassess" className="ogrencliList avatar">
              {stundent?.attandanceResponseDtos?.length > 0 ? (
                stundent?.attandanceResponseDtos?.map((student) => (
                  <div
                    key={student.id}
                    className={`studentCard ${getAttendanceClass(
                      student.present
                    )}`}
                  >
                    <div className="avatarAsil">
                      {/* {student.gender === "male" ? (
                        <MaleIcon />
                      ) : (
                        <FemaleIcon />
                      )} */}
                      <MaleIcon />
                    </div>
                    <div className="info">
                      <span className="name">{student.name}</span>
                      <span className="age">{student.lastName}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Öğrenci bulunamadı</p>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default AdminSessionEdit;
