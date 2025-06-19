import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import {
  getSeansesByDate,
  resetTheSeanses,
  setSelectedSeans,
} from "../../../redux/slices/seansSlice";
import Loading from "../../loading/Loading";
import "./CoDevamsizlikGir.scss";
import DoneIcon from "@mui/icons-material/Done";
import {
  checkedStudentsByIdSession,
  getStudentsByIdSession,
} from "../../../redux/slices/studentSlice";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const CoDevamsizlikGir = () => {
  const dispatch = useDispatch();
  const { seanses, selectedSeans } = useSelector((state) => state.seansSlice);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    sessionInfo: {},
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    dispatch(setSelectedSeans(null));
    dispatch(resetTheSeanses());
  }, [dispatch]);

  useEffect(() => {
    if (!(formData.date == "")) {
      setFormData((prev) => ({
        ...prev,
        sessionInfo: {},
      }));
      dispatch(setSelectedSeans(null));
      dispatch(getSeansesByDate(formData.date));
    }
  }, [dispatch, formData.date, isSubmiting]);

  useEffect(() => {
    const fetchStudent = async (id) => {
      try {
        const response = await dispatch(
          getStudentsByIdSession({ id })
        ).unwrap();
        setFormData((prev) => ({
          ...prev,
          sessionInfo: response,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedSeans) {
      fetchStudent(selectedSeans.id);
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

  const handleSubmitDevamsizlik = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      await dispatch(
        checkedStudentsByIdSession(formData?.sessionInfo)
      ).unwrap();
      setIsSubmiting((prev) => !prev);
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Öğrenciler Kaydedildi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.message || "Hata Oluştu",
          status: "error",
        })
      );
    } finally {
      setIsloading(false);
    }
  };

  const getAttendanceClass = (attendance) => {
    if (attendance === true) return "attended";
    if (attendance === false) return "absent";
  };

  const handleToggleAttendance = (studentId) => {
    setFormData((prev) => {
      const updatedAttandance = prev.sessionInfo.attandanceResponseDtos.map(
        (student) => {
          if (student.id === studentId) {
            return {
              ...student,
              present: !student.present,
            };
          }
          return student;
        }
      );

      return {
        ...prev,
        sessionInfo: {
          ...prev.sessionInfo,
          attandanceResponseDtos: updatedAttandance,
        },
      };
    });
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Öğrenci Devamsızlık Gir</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmitDevamsizlik} className="devamsizlik">
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
                      dispatch(setSelectedSeans(item));
                    }}
                    className={
                      selectedSeans?.id == item?.id
                        ? "seansItem selectedSeans"
                        : "seansItem"
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
                {formData?.sessionInfo?.attandanceResponseDtos?.length > 0 ? (
                  formData.sessionInfo?.attandanceResponseDtos?.map(
                    (student, idx) => (
                      <div
                        key={student?.id}
                        className={`studentCarddd ${getAttendanceClass(
                          student.present
                        )}`}
                        onClick={() => handleToggleAttendance(student.id)}
                      >
                        <span>{student.name}</span>
                        <span>{student.lastName}</span>
                      </div>
                    )
                  )
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

export default CoDevamsizlikGir;
