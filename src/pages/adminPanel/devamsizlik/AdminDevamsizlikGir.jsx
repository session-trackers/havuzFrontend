import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import {
  getSeansesFilter,
  setSelectedSeans,
} from "../../../redux/slices/seansSlice";
import Loading from "../../loading/Loading";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import "./AdminDevamsizlikGir.scss";
import DoneIcon from "@mui/icons-material/Done";

const AdminDevamsizlikGir = () => {
  const dispatch = useDispatch();
  const { seanses, selectedSeans } = useSelector((state) => state.seansSlice);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    students: [],
  });

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
        <h4>Devamsızlık Gir</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmitDuzenleDevamsizlik} className="devamsizlik">
          <div className="topSide avatar">
            <label>
              Gün Gir:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>

            {seanses && (
              <div className="sessionsList">
                {seanses?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedSeans(item);
                    }}
                    className={
                      selectedSeans.id == item.id
                        ? "seansItem"
                        : "seansItem selectedSeans"
                    }
                  >
                    <span>{item.name}</span>
                    <span>{`${item.startHour} - ${item.endHour}`}</span>
                    <div className="icon">
                      <DoneIcon className="iconAsil" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedSeans && (
            <div className="bottomSectionn avatar">
              <div className="ogrencliList ">
                {formData.students.length > 0 ? (
                  formData.students?.map((student, idx) => (
                    <>
                      <label
                        key={student.id}
                        className={`studentCard ${getAttendanceClass(
                          student.attendance
                        )}`}
                      >
                        <input
                          type="checkbox"
                          checked={!!student.attendance}
                          onChange={(e) => handleAttendanceChange(e, idx)}
                        />

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
                      </label>
                    </>
                  ))
                ) : (
                  <p>Öğrenci bulunamadı</p>
                )}
              </div>
              <div className="buttonContainer">
                <button type="submit">Düzenle</button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default AdminDevamsizlikGir;
