import "./AdminDevamsizlikGoruntule.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../Kutuphanem/Pagination/Pagination";
import Loading from "../../loading/Loading";
import { getKAdroByDevamsizlik } from "../../../redux/slices/kadroSlice";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const AdminDevamsizlikGoruntuleKAdro = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [kadro, setKadro] = useState([]);
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
          getKAdroByDevamsizlik(formData)
        ).unwrap();
        setKadro(response);
        setIsloading(false);
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.message || "Hocalar Çekilemedi veya Yok",
            status: "error",
          })
        );
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
        <h4>Devamsızlık Yapan Hocalar</h4>
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
                          <th className="col-1">Ünvan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.sessionCoachAttendanceTitles
                          .filter((hoca) => !hoca.present)
                          .map((hoca, hocaIdx) => (
                            <tr key={hocaIdx}>
                              <td>{hoca.name}</td>
                              <td>{hoca.lastName}</td>
                              <td>{hoca.title}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <p className="no-products-message">Hoca Bulunamadı</p>
              )
            ) : (
              ""
            )}

            {kadro.length > 0 && (
              <Pagination
                itemsPerPage={10}
                items={kadro}
                setCurrentItems={setCurrentItems}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDevamsizlikGoruntuleKAdro;
