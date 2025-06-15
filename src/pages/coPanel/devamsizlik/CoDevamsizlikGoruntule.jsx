import "./CoDevamsizlikGoruntule.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getStudentsByDevamsizlik } from "../../../redux/slices/studentSlice";
import Pagination from "../../../Kutuphanem/Pagination/Pagination";
import Loading from "../../loading/Loading";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CoDevamsizlikGoruntule = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [students, setStudents] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      setIsloading(true);
      try {
        const response = await dispatch(
          getStudentsByDevamsizlik(formData)
        ).unwrap();
        setStudents(response);
        setIsloading(false);
      } catch (error) {
        console.log(error);
        setIsloading(false);
      }
    };

    if (!(formData.endDate == "" || formData.startDate == "")) {
      fetchStudents();
    }
  }, [dispatch, formData]);

  return (
    <div className="projeList">
      <div className="title">
        <h4>Devamsızlık Yapan Öğrenciler</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="urunList">
          <div className="urunListContent">
            <label className="secilenBolum">
              <input
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                type="date"
              />
              <input
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
                type="date"
              />
            </label>

            {formData.startDate && formData.endDate ? (
              currentItems?.length > 0 ? (
                currentItems.map((item, idx) => (
                  <div className="product-table" key={idx}>
                    <h4 className="session-title">
                      📅 {item.date} | 🕒 {item.startHour} - {item.endHour} | 🧑‍🏫{" "}
                      {item.sessionName}
                    </h4>

                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th className="col-2">Ad</th>
                          <th className="col-1">Soyad</th>
                          <th className="col-1 aks"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.attandanceResponseDtos
                          .filter((student) => !student.present)
                          .map((student) => (
                            <tr key={student.customerId}>
                              <td>{student.name}</td>
                              <td>{student.lastName}</td>
                              <td className="editTd">
                                <Link
                                  to={`/admin/ogrenciduzenle/${student.customerId}`}
                                  className="edit"
                                >
                                  <VisibilityIcon className="icon" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <p className="no-products-message">Öğrenci Bulunamadı</p>
              )
            ) : (
              ""
            )}

            {students.length > 0 && (
              <Pagination
                itemsPerPage={10}
                items={students}
                setCurrentItems={setCurrentItems}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoDevamsizlikGoruntule;
