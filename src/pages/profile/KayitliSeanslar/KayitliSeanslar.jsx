import { useEffect, useState } from "react";
import "./KayitliSeanslar.scss";
import api from "../../../api/api";
import { BASE_URL } from "../../../config/baseApi";
import { useDispatch } from "react-redux";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";
import Loading from "../../loading/Loading";

const KayitliSeanslar = () => {
  const [calendar, setCalendar] = useState(null);
  const now = new Date();
  const dispatch = useDispatch();

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 0-indexed olduğu için +1
  const [seanses, setSeanses] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchSeansesUser = async () => {
      setisLoading(true);
      try {
        const response = await api.get(
          `${BASE_URL}/api/v1/attendance/customer-register-session?year=${year}&month=${month}`
        );
        setSeanses(response.data);
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.message || "Hata oluştur",
            status: "error",
          })
        );
      } finally {
        setisLoading(false);
      }
    };

    if (!(month == "" || year == "")) {
      fetchSeansesUser();
    }
  }, [year, month]);

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

        const seansForDay = seanses?.filter(
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
  }, [month, year, seanses]);

  return (
    <div className="sifreDegistir">
      <div className="title">
        <h3>Kayıtlı Seanslar</h3>
      </div>

      <hr />

      {isLoading ? (
        <Loading />
      ) : (
        <form className="bars">
          {!(month == "" || year == "") && (
            <div className="topSide ">
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
                                key={i}
                                className={
                                  seans.present ? "seans" : "seans katilimYok"
                                }
                              >
                                {seans.startHour} - {seans.endHour} <br />
                                {seans.name} <br />
                                {seans.poolName} <br />
                                {seans.date}
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
        </form>
      )}
    </div>
  );
};

export default KayitliSeanslar;
