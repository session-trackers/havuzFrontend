import "./AdminPaketler.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListCardDelete from "../../../components/listCardDelete/ListCardDelete";
import StudentCard from "./StudentCard";
import Pagination from "../../../Kutuphanem/Pagination/Pagination";
import Loading from "../../loading/Loading";
import {
  getPakets,
  updatePaketsTheUser,
} from "../../../redux/slices/paketSlice";
import {
  getStudents,
  getStudentsByPaketId,
} from "../../../redux/slices/studentSlice";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const AdminPaketler = () => {
  const dispatch = useDispatch();

  const { paketler } = useSelector((state) => state.paketSlice);
  const { students } = useSelector((state) => state.studentSlice);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedPaketId, setSelectedPaket] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [initialStudentIds, setInitialStudentIds] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [formData, setFormData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [searchQueryPaket, setSearchQueryPaket] = useState("");
  const [searchQueryUser, setSearchQueryUser] = useState("");

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

  const handleEditStudent = async (paketId) => {
    setSelectedPaket(paketId);
    try {
      const response = await dispatch(getStudents()).unwrap();
      setStudentData(response);
      const selected = await dispatch(getStudentsByPaketId(paketId)).unwrap();
      const selectedIds = selected
        .filter((s) => s.sessions.length > 0)
        .map((s) => s.customerId);
      setInitialStudentIds(selectedIds);
      setSelectedStudentIds(selectedIds);
      setPopUp(true);
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
        updatePaketsTheUser({
          selectedStudentIds,
          initialStudentIds,
          selectedPaketId,
        })
      ).unwrap();
      setPopUp(false);
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
            {currentItems?.map((item, index) => (
              <ListCardDelete
                key={index}
                handleEditStudent={handleEditStudent}
                item={item}
              />
            ))}
          </div>

          <Pagination
            itemsPerPage={9}
            items={formData}
            setCurrentItems={setCurrentItems}
          />

          {currentItems.length === 0 && <p>Hiç paket bulunamadı.</p>}

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
                  <button onClick={() => setPopUp(false)} className="cancel">
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

export default AdminPaketler;
