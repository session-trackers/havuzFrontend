import { useEffect, useState } from "react";
import Loading from "../../loading/Loading";
import "./Siparisler.scss";
import api from "../../../api/api";
import { BASE_URL } from "../../../config/baseApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

const Siparisler = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("PENDING");
  const tabs = ["PENDING", "APPROVED", "REJECTED", "FINISHED"];
  const [IsSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsloading(true);
      try {
        const response = await api.post(
          `${BASE_URL}/api/v1/customer-package/register-list`,
          {
            status: selectedTab,
            sortBy: "createAt",
            sortDirection: "DESC",
          }
        );
        setOrders(response.data);
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.message,
            status: "error",
          })
        );
      } finally {
        setIsloading(false);
      }
    };

    fetchOrders();
  }, [selectedTab, IsSubmit]);

  const handleOpenInNewTab = async (url) => {
    try {
      const response = await api.get(url, {
        responseType: "blob",
      });

      const file = new Blob([response.data], { type: response.data.type });
      const fileURL = URL.createObjectURL(file);

      // Yeni sekmede aç
      window.open(fileURL, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (id) => {
    setIsloading(true);
    try {
      await api.put(`${BASE_URL}/api/v1/customer-package/verification`, {
        customerPackageId: id,
        status: "APPROVED",
      });

      setIsSubmit((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleRejected = async (id) => {
    setIsloading(true);
    try {
      await api.put(`${BASE_URL}/api/v1/customer-package/verification`, {
        customerPackageId: id,
        status: "REJECTED",
      });

      setIsSubmit((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Sipariş Bölümü</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="projeList">
          <div className="orders-container">
            <div className="tabs">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className={`tab ${selectedTab === tab ? "active" : ""}`}
                  onClick={() => {
                    setSelectedTab(tab);
                  }}
                >
                  {tab === "APPROVED"
                    ? "Onaylanmış"
                    : tab === "PENDING"
                    ? "Bekleyenler"
                    : tab === "REJECTED"
                    ? "Reddedilenler"
                    : "Bitenler"}
                </div>
              ))}
            </div>

            <table className="custom-table">
              <thead>
                <tr>
                  <th className="col-2">İsim</th>
                  <th className="col-2">Paket</th>
                  <th className="col-1">Fiyat</th>
                  <th className="col-2">Tarih</th>
                  <th className="col-1"></th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.customerName}</td>
                      <td>{order.packageName}</td>
                      <td>{order.packagePrice}₺</td>
                      <td>{order.createAt}</td>
                      <td className="editTd">
                        <div className="buttonsContent">
                          {order.status === "PENDING" && (
                            <>
                              <button
                                className="download-btn"
                                onClick={() => handleDone(order.id)}
                              >
                                <DoneIcon className="icon" />
                              </button>

                              <button
                                className="download-btn"
                                onClick={() => handleRejected(order.id)}
                              >
                                <CloseIcon className="icon" />
                              </button>
                            </>
                          )}

                          {order.paymentImage?.url && (
                            <button
                              className="download-btn"
                              onClick={() =>
                                handleOpenInNewTab(order.paymentImage?.url)
                              }
                            >
                              <VisibilityIcon className="icon" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Sipariş bulunamadı.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Siparisler;
