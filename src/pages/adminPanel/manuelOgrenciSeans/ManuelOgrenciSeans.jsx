import "./ManuelOgrenciSeans.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListCardDelete from "../../../components/listCardSeans/ListCardDelete";

import Pagination from "../../../Kutuphanem/Pagination/Pagination";
import Loading from "../../loading/Loading";
import { getPakets } from "../../../redux/slices/paketSlice";
import {
  getStudents,
  getStudentsByIdSession,
} from "../../../redux/slices/studentSlice";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";
import StudentCard from "../paket/StudentCard";
import {
  getSeansesByPaketId,
  updateSeansTheUser,
} from "../../../redux/slices/seansSlice";

const ManuelOgrenciSeans = () => {
  const [formData, setFormData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [seanses, setSeanses] = useState([]);

  const { paketler } = useSelector((state) => state.paketSlice);
  const [currentItems, setCurrentItems] = useState([]);
  const { students } = useSelector((state) => state.studentSlice);

  const [selectedPaketId, setSelectedPaket] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [initialStudentIds, setInitialStudentIds] = useState([]);
  const [selectedSeans, setSelectedSeans] = useState(null);

  const [popUp, setPopUp] = useState(false);
  const [seansView, setSeansView] = useState(false);

  const [searchQueryPaket, setSearchQueryPaket] = useState("");
  const [searchQueryUser, setSearchQueryUser] = useState("");

  const [calendar, setCalendar] = useState(null);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getPakets()).unwrap();
        setFormData(response);
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.data || "Paketler Çekilemedi",
            status: "error",
          })
        );
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (seanses.length > 0) {
      const yeniTakvim = generateCalendar();
      setCalendar(yeniTakvim);
    }
  }, [seanses, month, year]);

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
          isValid && new Date(seans.date).toDateString() === date.toDateString()
      );

      calendarIc.push({
        date,
        isValid,
        seanses: seansForDay,
      });
    }

    return calendarIc;
  };

  const handleEditStudent = async (seans) => {
    setSelectedSeans(seans);
    try {
      const response = await dispatch(getStudents()).unwrap();
      setStudentData(response);

      const selected = await dispatch(
        getStudentsByIdSession({ id: seans.id })
      ).unwrap();

      const selectedIds = Array.isArray(selected.attandanceResponseDtos)
        ? selected.attandanceResponseDtos.map((s) => s.customerId)
        : [];

      setInitialStudentIds(selectedIds);
      setSelectedStudentIds(selectedIds);
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error?.response?.data || "Hata Oluştu",
          status: "error",
        })
      );
    } finally {
      setPopUp(true);
    }
  };

  const handleEditSeans = async (paketId) => {
    setSelectedPaket(paketId);
    try {
      const response = await dispatch(getSeansesByPaketId(paketId)).unwrap();
      setSeanses(response);
      setSeansView(true);
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.data || "Hata Oluştu",
          status: "error",
        })
      );
    }
  };

  const handleSubmitChanges = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        updateSeansTheUser({
          selectedSeansId: selectedSeans.id,
          selectedStudentIds,
          initialStudentIds,
          selectedPaketId,
        })
      ).unwrap();

      resetPopupState();
      dispatch(getStudents());
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Kişiler Düzenlendi",
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
    } finally {
      setIsLoading(false);
      setPopUp(false);
      setSelectedSeans(null);
      setSelectedPaket("");
      setSeansView(false);
      setSelectedStudentIds([]);
      setInitialStudentIds([]);
    }
  };

  const resetPopupState = () => {
    setSelectedPaket("");
    setInitialStudentIds([]);
    setSelectedStudentIds([]);
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQueryPaket(query);

    const filtered = paketler.filter((proje) =>
      proje.name.toLowerCase().includes(query)
    );
    setFormData(filtered);
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Paketler</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="listAdmin">
          {/* Arama Alanı */}
          <div className="arama">
            <label>
              Paket Ara:
              <input
                type="text"
                placeholder="Paket ara..."
                value={searchQueryPaket}
                onChange={handleSearch}
              />
            </label>
          </div>

          {/* Paket Kartları */}
          <div className="listCardss">
            {currentItems.map((item, index) => (
              <ListCardDelete
                key={index}
                handleEditSeans={handleEditSeans}
                item={item}
                selectedPaketId={selectedPaketId}
              />
            ))}
          </div>

          <Pagination
            itemsPerPage={9}
            items={formData}
            setCurrentItems={setCurrentItems}
          />

          {currentItems.length === 0 && <p>Hiç paket bulunamadı.</p>}

          {seansView && (
            <div className="topSide">
              {month && year && <p>{`${month}.Ay - ${year}`}</p>}
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
                                onClick={() => handleEditStudent(seans)}
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
              </div>

              <div className="buttons">
                <button
                  type="button"
                  disabled={month == 1}
                  onClick={() => {
                    if (month > 1) {
                      setMonth((prev) => prev - 1);
                    }
                  }}
                  style={{
                    backgroundColor: "darkgoldenrod",
                    marginRight: "1rem",
                  }}
                  className={month == 1 ? "disabled" : ""}
                >
                  Önceki Ayı GÖr
                </button>
                <button
                  disabled={month == 12}
                  type="button"
                  onClick={() => {
                    if (month < 12) {
                      setMonth((prev) => prev + 1);
                    }
                  }}
                  className={month == 12 ? "disabled" : ""}
                >
                  Gelecek Ayı GÖr
                </button>
              </div>
            </div>
          )}

          {popUp && (
            <div className="popupStudent">
              <div className="popup-inner">
                <div className="studentSearch">
                  <label className="searchLabel">
                    <input
                      type="text"
                      placeholder="Ara"
                      value={searchQueryUser}
                      onChange={(e) => {
                        const queryUser = e.target.value.toLowerCase();
                        setSearchQueryUser(queryUser);

                        const filtered = students.filter((proje) =>
                          proje.name.toLowerCase().includes(queryUser)
                        );
                        setStudentData(filtered);
                      }}
                    />
                  </label>
                </div>

                <div className="section">
                  {studentData?.map((student) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      isSelected={selectedStudentIds.includes(student.id)}
                      onClick={() => toggleStudentSelection(student.id)}
                    />
                  ))}
                </div>

                <div className="popup-buttons">
                  <button
                    onClick={() => {
                      setPopUp(false);
                      setSelectedSeans(null);
                      setSelectedPaket("");
                      setSeansView(false);
                      setSelectedStudentIds([]);
                      setInitialStudentIds([]);
                    }}
                    className="cancel"
                  >
                    İptal
                  </button>
                  <button onClick={handleSubmitChanges} className="confirm">
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManuelOgrenciSeans;
