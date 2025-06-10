import { useEffect, useState } from "react";
import Loading from "../../loading/Loading";
import "./OnKayit.scss";
import api from "../../../api/api";
import { BASE_URL } from "../../../config/baseApi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getPakets } from "../../../redux/slices/paketSlice";
import StudentCard from "./StudentCard";

const OnKayit = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("PENDING");
  const tabs = ["PENDING"];
  const [IsSubmit, setIsSubmit] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [selectedPaketId, setSelectedPaketId] = useState("");
  const [formData, setFormData] = useState([]);
  const { paketler } = useSelector((state) => state.paketSlice);
  const [searchQueryPaket, setSearchQueryPaket] = useState("");
  const [selectedOrderId, setselectedOrderId] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setIsloading(true);
      try {
        const response = await api.get(
          `${BASE_URL}/api/v1/pre-customer-package/register`
        );
        setOrders(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
        setIsloading(false);
      }
    };

    fetchOrders();
  }, [selectedTab, IsSubmit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getPakets()).unwrap();
        setFormData(response);
      } catch (error) {
        console.error("Paketler alınamadı", error);
      }
    };

    fetchData();
  }, [dispatch]);

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

  const handleDone = async (id, packageId) => {
    setIsloading(true);
    try {
      await api.put(
        `${BASE_URL}/api/v1/customer-package/pre-customer-package-change?preCustomerPackageId=${id}&packageId=${packageId}`
      );
      setselectedOrderId("");
      setSelectedPaketId("");
      setPopUp(false);
      setIsSubmit((prev) => !prev);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  // const handleRejected = async (id) => {
  //   setIsloading(true);
  //   try {
  //     await api.put(`${BASE_URL}/api/v1/customer-package/verification`, {
  //       customerPackageId: id,
  //       status: "REJECTED",
  //     });

  //     setIsSubmit((prev) => !prev);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsloading(false);
  //   }
  // };

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
                    : "Reddedilenler"}
                </div>
              ))}
            </div>

            <table className="custom-table">
              <thead>
                <tr>
                  <th className="col-2">İsim</th>
                  <th className="col-1">Paket</th>
                  <th className="col-1">Fiyat</th>
                  <th className="col-1">Tarih</th>
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
                          <button
                            className="download-btn"
                            onClick={() => {
                              setselectedOrderId(order.id);
                              setPopUp(true);
                            }}
                          >
                            <DoneIcon className="icon" />
                          </button>

                          {/* <button
                                className="download-btn"
                                onClick={() => handleRejected(order.id)}
                              >
                                <CloseIcon className="icon" />
                              </button> */}

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

          {popUp && (
            <div className="popupStudent">
              <div className="popup-inner">
                <div className="studentSearch">
                  <label className="searchLabel">
                    <input
                      type="text"
                      placeholder="Ara"
                      value={searchQueryPaket}
                      onChange={(e) => {
                        const queryUser = e.target.value.toLowerCase();
                        setSearchQueryPaket(queryUser);

                        const filtered = paketler.filter((proje) =>
                          proje.name.toLowerCase().includes(queryUser)
                        );
                        setFormData(filtered);
                      }}
                    />
                  </label>
                </div>

                <div className="section">
                  {formData.map((paket) => (
                    <StudentCard
                      key={paket.id}
                      student={paket}
                      isSelected={selectedPaketId == paket.id}
                      onClick={() => setSelectedPaketId(paket.id)}
                    />
                  ))}
                </div>

                <div className="popup-buttons">
                  <button
                    onClick={() => {
                      setPopUp(false);
                      setSelectedPaketId("");
                      setselectedOrderId("");
                    }}
                    className="cancel"
                  >
                    İptal
                  </button>
                  <button
                    onClick={async () => {
                      handleDone(selectedOrderId, selectedPaketId);
                    }}
                    className="confirm"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnKayit;
