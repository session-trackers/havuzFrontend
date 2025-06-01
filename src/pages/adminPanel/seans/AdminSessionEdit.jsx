import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import SeansSingleDown from "./SeansSingleDown";
import {
  getSeanses,
  removeSeans,
  setSelectedSeans,
  updateSeans,
} from "../../../redux/slices/seansSlice";
import Loading from "../../loading/Loading";
import { getPools } from "../../../redux/slices/poolSlice";
import { getKadro } from "../../../redux/slices/kadroSlice";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

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

  const [isLoading, setIsloading] = useState(false);
  const [showPopupSeans, setShowPopupSeans] = useState(false);
  const [formData, setFormData] = useState({
    sessionName: "",
    startHour: "",
    endHour: "",
    selectedPoolId: "",
    selectedBasAntrenorIds: [],
    selectedKondisyonersIds: [],
    selectedAlanSorumlusuIds: [],
    selectedCankurtaransIds: [],
    selectedAntrenorsIds: [],
    selectedStajyerAntrenorsIds: [],
    date: "",
    sessionDescription: "",
    color: "",
    students: [],
  });

  useEffect(() => {
    dispatch(getPools());
    dispatch(getKadro());
    dispatch(getSeanses());
  }, [dispatch]);

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

        const seansForDay = seanses.filter(
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

  const handleConfirmDeleteSeans = async (e) => {
    e.preventDefault();
    try {
      await dispatch(removeSeans(formData.id)).unwrap();
      setShowPopupSeans(false);
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

  const getAttendanceClass = (attendance) => {
    if (attendance === true) return "attended";
    if (attendance === false) return "absent";
    return "unknown";
  };

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
                            {day.seanses.map((seans, i) => (
                              <div
                                onClick={() =>
                                  dispatch(setSelectedSeans(seans))
                                }
                                key={i}
                                className="seans"
                              >
                                {seans.startHour} - {seans.endHour} <br />
                                {seans.sessionName}
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
                      onClick={() => {
                        setIsOpenView(true);
                      }}
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
                    name="sessionName"
                    value={formData.sessionName}
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
                    value={formData.sessionDescription}
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
                      name="startDate"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="buttonContainer">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPopupSeans(true);
                    }}
                    className="delete"
                  >
                    Seansı İptal Et
                  </button>

                  <button
                    disabled={
                      !(
                        selectedSeans?.categoryName !== formData.name ||
                        selectedSeans?.categoryDescription !==
                          formData.description
                      )
                    }
                    className={
                      !(
                        selectedSeans?.categoryName !== formData.name ||
                        selectedSeans?.categoryDescription !==
                          formData.description
                      )
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
            <div className="ogrencliList avatar">
              {formData.students.length > 0 ? (
                formData.students?.map((student) => (
                  <div
                    key={student.id}
                    className={`studentCard ${getAttendanceClass(
                      student.attendance
                    )}`}
                  >
                    <div className="avatarAsil">
                      {student.gender === "male" ? (
                        <MaleIcon />
                      ) : (
                        <FemaleIcon />
                      )}
                    </div>
                    <div className="info">
                      <span className="name">{student.name}</span>
                      <span className="age">Yaş: {student.age}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>Öğrenci bulunamadı</p>
              )}
            </div>
          )}

          {showPopupSeans && (
            <div className="popup">
              <div className="popup-inner">
                <p>Seansı iptal etmek istediğinize emin misiniz?</p>
                <div className="popup-buttons">
                  <button
                    className="cancel"
                    type="button"
                    onClick={() => {
                      setShowPopupSeans(false);
                    }}
                  >
                    Vazgeç
                  </button>
                  <button
                    type="button"
                    className="confirm"
                    onClick={handleConfirmDeleteSeans}
                  >
                    Seansı İptal Et
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

export default AdminSessionEdit;
