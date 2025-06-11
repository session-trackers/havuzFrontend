import "./SiparisMusteri.scss";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/baseApi";
import api from "../../../api/api";
import Loading from "../../loading/Loading";

const SiparisMusteri = () => {
  const [data, setData] = useState([]);
  const [onKayit, setonKayit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSiparisData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `${BASE_URL}/api/v1/customer-package/has-package`
        );
        setData(response.data);

        const response2 = await api.get(
          `${BASE_URL}/api/v1/pre-customer-package/has-pre`
        );
        setData(response.data);
        setonKayit(response2.data);

        console.log(response2.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSiparisData();
  }, []);

  return (
    <div className="siparisBilgileri">
      <div className="title">
        <h3>Sipariş Bilgileriniz</h3>
      </div>

      <hr />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="order-page">
          <table className="order-table">
            <thead>
              <tr>
                <th>Paket Adı</th>
                <th>Toplam Fiyat</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.status == "REJECTED"
                      ? "Reddedildi"
                      : item.status == "APPROVED"
                      ? "Onaylandı"
                      : "Beklemede"}
                  </td>
                </tr>
              ))}

              {onKayit?.map((item, index) => (
                <tr key={index}>
                  <td>{item.packageName}</td>
                  <td>{item.packagePrice}</td>
                  <td>Ön Kayıt Beklemede</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SiparisMusteri;
