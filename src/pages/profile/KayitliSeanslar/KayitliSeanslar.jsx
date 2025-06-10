import { useEffect, useState } from "react";
import "./KayitliSeanslar.scss";
import api from "../../../api/api";
import { BASE_URL } from "../../../config/baseApi";

const KayitliSeanslar = () => {
  const [calendar, setCalendar] = useState(null);
  const now = new Date();

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 0-indexed olduğu için +1
  // const [year, setYear] = useState("");
  // const [month, setMonth] = useState("");
  const [seanses, setSeanses] = useState([]);

  useEffect(() => {
    const fetchSeansesUser = async () => {
      try {
        const response = await api.get(
          `${BASE_URL}/api/v1/customer-package/has-package`
        );
        setSeanses(response.data);
      } catch (error) {
        console.log(error);
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
      <form className="bars">
        {!(month == "" || year == "") && (
          <div className="topSide ">
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
                              className={"seans"}
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
          </div>
        )}
      </form>
    </div>
  );
};

export default KayitliSeanslar;
