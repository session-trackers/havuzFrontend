import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeout } from "../../../redux/slices/alertSlice";
import {
  getSeansesByDate,
  resetTheSeanses,
  setSelectedSeans,
} from "../../../redux/slices/seansSlice";
import Loading from "../../loading/Loading";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import "./AdminDevamsizlikGir.scss";
import DoneIcon from "@mui/icons-material/Done";
import {
  checkedKadroByIdSession,
  getKadroByIdSession,
} from "../../../redux/slices/kadroSlice";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const AdminDevamsizlikKadroGir = () => {
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
    const fetchKadro = async (id) => {
      try {
        const response = await dispatch(getKadroByIdSession({ id })).unwrap();
        setFormData((prev) => ({
          ...prev,
          sessionInfo: response,
        }));
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.message || "Hocalar Çekilemedi veya Yok",
            status: "error",
          })
        );
      }
    };

    if (selectedSeans) {
      fetchKadro(selectedSeans.id);
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
    try {
      await dispatch(checkedKadroByIdSession(formData?.sessionInfo)).unwrap();
      setIsSubmiting((prev) => !prev);
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Devamsızlıklar Kaydedildi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.message || "Devamsızlıklar Kaydedilemedi",
          status: "error",
        })
      );
    }
  };

  const getAttendanceClass = (attendance) => {
    if (attendance === true) return "attended";
    if (attendance === false) return "absent";
  };

  const handleToggleAttendance = (coachId) => {
    setFormData((prev) => {
      const updatedAttandance =
        prev.sessionInfo.sessionCoachAttendanceTitles.map((hoca) => {
          if (hoca.coachId === coachId) {
            return {
              ...hoca,
              present: !hoca.present,
            };
          }
          return hoca;
        });

      return {
        ...prev,
        sessionInfo: {
          ...prev.sessionInfo,
          sessionCoachAttendanceTitles: updatedAttandance,
        },
      };
    });
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Hoca Devamsızlık Gir</h4>
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
                {formData?.sessionInfo?.sessionCoachAttendanceTitles?.length >
                0 ? (
                  formData.sessionInfo?.sessionCoachAttendanceTitles?.map(
                    (student, idx) => (
                      <div
                        key={idx}
                        className={`studentCarddd ${getAttendanceClass(
                          student.present
                        )}`}
                        onClick={() => handleToggleAttendance(student.coachId)}
                      >
                        <span>{student.name}</span>
                        <span>{student.lastName}</span>
                      </div>
                    )
                  )
                ) : (
                  <p>Hoca bulunamadı</p>
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

export default AdminDevamsizlikKadroGir;
