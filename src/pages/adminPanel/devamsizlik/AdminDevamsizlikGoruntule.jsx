import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import {
  getSeansesFilter,
  resetTheSeanses,
  setSelectedSeans,
} from "../../../redux/slices/seansSlice";
import Loading from "../../loading/Loading";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import "./AdminDevamsizlikGir.scss";
import DoneIcon from "@mui/icons-material/Done";

const AdminDevamsizlikGoruntule = () => {
  const dispatch = useDispatch();
  const { seanses, selectedSeans } = useSelector((state) => state.seansSlice);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    students: [],
  });

  useEffect(() => {
    dispatch(setSelectedSeans(null));
    dispatch(resetTheSeanses());
  }, []);

  useEffect(() => {
    if (!(formData.date == "")) {
      //   dispatch(getSeansesFilter());
      //   dispatch(getSeansesDate(formData.date));
    }
  }, [dispatch, formData.date]);

  useEffect(() => {
    if (selectedSeans) {
      setFormData({
        students: selectedSeans?.students || [],
        id: selectedSeans?.id || "",
        date: selectedSeans?.date || "",
      });
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

  const handleSubmitDuzenleDevamsizlik = async (e) => {
    e.preventDefault();
    try {
      //   await dispatch(updateSeans({ formData })).unwrap();
      dispatch(
        showAlertWithTimeout({
          message: "Öğrenciler kaydedildi",
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
  };

  const handleAttendanceChange = (e, idx) => {
    const updatedStudents = [...formData.students];
    updatedStudents[idx].attendance = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      students: updatedStudents,
    }));
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Devamsızlık Görüntüle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmitDuzenleDevamsizlik} className="devamsizlik">
          <div className="topSide avatar">
            <div className="dateSelecet">
              <label>
                <select
                // value={year}
                // onChange={(e) => setYear(Number(e.target.value))}
                >
                  <option value="">Yıl Seçin</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </label>
              <label>
                <select
                // value={month}
                // onChange={(e) => setMonth(Number(e.target.value))}
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
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminDevamsizlikGoruntule;
