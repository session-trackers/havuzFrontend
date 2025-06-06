import "./Ogrenciler.scss";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getStudents } from "../../../redux/slices/studentSlice";
import Pagination from "../../../Kutuphanem/Pagination/Pagination";
import Loading from "../../loading/Loading";

const Ogrenciler = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { students, loadingStudentsStatus } = useSelector(
    (state) => state.studentSlice
  );
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      setIsloading(true);
      try {
        await dispatch(getStudents()).unwrap();
        setIsloading(false);
      } catch (error) {
        console.log(error);
        setIsloading(false);
      }
    };

    fetchStudent();
  }, [dispatch]);

  useEffect(() => {
    const filtered = students.filter((student) => {
      const fullName = `${student.name} ${student.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

    setCurrentItems(filtered);
  }, [searchTerm, students]);

  console.log(currentItems);

  return (
    <div className="projeList">
      <div className="title">
        <h4>Öğrenciyi Düzenle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="urunList">
          <div className="urunListContent">
            <label className="secilenBolum">
              Arama:
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Öğrenci adı veya soyadı"
              />
            </label>

            {currentItems?.length > 0 ? (
              <div className="product-table">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th className="col-2">Öğrenci Ad Soyad</th>
                      <th className="col-1">Öğrenci Kan Grubu</th>
                      <th className="col-1">Öğrenci Veli Ad Soyad</th>
                      <th className="col-1">Öğrenci Veli No</th>
                      <th className="col-1">Öğrenci Mail</th>
                      <th className="col-1 aks"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems?.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          {item.name} {item.lastName}
                        </td>
                        <td>{item.bloodType}</td>
                        <td>{item.parentName}</td>
                        <td>{item.parentPhoneNo}</td>
                        <td>{item.email}</td>
                        <td className="editTd">
                          <Link
                            to={`/admin/ogrenciduzenle/${item.id}`}
                            className="edit"
                          >
                            <EditIcon className="icon" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-products-message">Öğrenci Bulunamadı</p>
            )}

            {!searchTerm && (
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

export default Ogrenciler;
