import "./PaketDetay.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Baslik from "../../Kutuphanem/baslik/Baslik";
import SikcaSorulan from "../../Kutuphanem/sikcaSorulan/SikcaSorulan";
import Loading from "../loading/Loading";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";
import MrGlide from "../../Kutuphanem/urunDetayGlide/MrGlide";
import NameAndMarka from "../../Kutuphanem/urunDetay/nameAndMarka/NameAndMarka";
import FiyatActions from "../../Kutuphanem/urunDetay/fiyatActions/FiyatActions";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import api from "../../api/api";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { showAlertWithTimeoutKullanici } from "../../redux/slices/alertKullaniciSlice";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "black" : "black",
  },
}));

const PaketDetay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const { isLogin, isAuthChecked, role } = useSelector(
    (state) => state.authSlice
  );
  const [katilan, setKatilan] = useState(1);
  const { id } = useParams();
  const [popUp, setPopUp] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [paketDurumu, setPaketDurumu] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isOnkayit, setIsOnkayit] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        const paketResponse = await axios.get(
          `${BASE_URL}/api/v1/package/by-id?id=${id}`
        );
        setProductDetail(paketResponse.data);
        setSelectedImage(paketResponse.data.coverImage?.url);

        const kisiResponse = await axios.get(
          `${BASE_URL}/api/v1/customer-package/active-customer?packageId=${id}`
        );
        setKatilan(kisiResponse.data);

        if (isLogin && role == "CUSTOMER") {
          const paketDurumuResponse = await api.get(
            `${BASE_URL}/api/v1/customer-package/package-status?packageId=${id}`
          );
          setPaketDurumu(paketDurumuResponse.data);

          const onKayitResponse = await api.get(
            `${BASE_URL}/api/v1/pre-customer-package/pre-package-status?packageId=${id}`
          );

          setIsOnkayit(onKayitResponse.data);
        }
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.data || "Bir hata oluştu",
            status: "error",
          })
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthChecked) {
      fetchData();
    }
  }, [id, isAuthChecked, isSubmiting]);

  const handleImageClick = (image) => {
    setSelectedImage(image.url); // Yeni resmi güncelle
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
    event.target.value = "";
  };

  const handleSepeteEkle = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(true);
    try {
      if (katilan >= productDetail?.capacity) {
        await api.post(
          `${BASE_URL}/api/v1/pre-customer-package/login`,
          {
            packageId: productDetail.id,
            paymentImage: coverImage,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await api.post(
          `${BASE_URL}/api/v1/customer-package`,
          {
            paymentImage: coverImage,
            packageId: productDetail.id,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      setIsSubmiting((prev) => !prev);
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "İstek Başarılı",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.data,
          status: "error",
        })
      );
    } finally {
      setIsLoading(false);
      setCoverImage(null);
      setPopUp(false);
    }
  };

  if (isLoading && isAuthChecked) {
    return <Loading />;
  }

  return (
    <div className="projeDetay">
      <div className="projectName">
        <img src={productDetail.coverImage?.url} alt="" />
        <div className="container">
          <div className="bannerText">
            <div className="title">
              <h1>{productDetail.name}</h1>
            </div>
          </div>
        </div>

        <div className="background"></div>
      </div>

      <div className="container">
        <div className="tabletNamee">
          <h3>Paket Resimlerimiz</h3>
        </div>

        <div className="mainTop">
          <div className="mainSectionSide">
            <div className="product-gallery">
              <div className="single-img">
                <img src={selectedImage} alt="Selected Product" />
              </div>
              <div className="product-thump">
                <MrGlide
                  images={productDetail.images}
                  onImageClick={handleImageClick}
                />
              </div>
            </div>

            <div className="rightActionSide">
              <div className="barr">
                <BorderLinearProgress
                  variant="determinate"
                  value={Math.min(
                    (katilan / productDetail?.capacity) * 100 || 0,
                    100
                  )}
                />
                <p>
                  %
                  {Math.min(
                    (katilan / productDetail?.capacity) * 100 || 0,
                    100
                  )}{" "}
                  dolu
                </p>
              </div>

              <FiyatActions
                id={productDetail.id}
                fiyat={productDetail.price + 1500}
                indirimliFiyat={productDetail.price}
              />

              <NameAndMarka
                marka={"Birlikte Spor Kulübü"}
                name={productDetail.name}
                desc={productDetail.description}
                longDescription={productDetail.longDescription}
              />

              <div className="buttons">
                <div className="sepeteEkle">
                  {(() => {
                    if (role === "ADMIN") {
                      return (
                        <div className="btnSepet disabled">
                          Admin kayıt olamaz
                        </div>
                      );
                    }

                    if (!isLogin) {
                      return (
                        <>
                          <p style={{ margin: "1.3rem 10px" }}>
                            Kayıt olduktan sonra tekrar buraya gelip kursu satın
                            alabilirsin
                          </p>

                          <Link to={"/customerregister"} className="btnSepet">
                            Sisteme Kayıt Ol
                          </Link>
                        </>
                      );
                    }

                    if (role === "CUSTOMER" && isOnkayit) {
                      return (
                        <div className="btnSepet disabled">
                          Ön Kayıt Yapıldı
                        </div>
                      );
                    }

                    if (paketDurumu?.status === "REJECTED") {
                      return (
                        <button
                          onClick={() => setPopUp(true)}
                          className="btnSepet"
                        >
                          {katilan >= productDetail.capacity
                            ? "Ön kayıt yaptır"
                            : "Kayıt Oluştur"}
                        </button>
                      );
                    }

                    if (paketDurumu?.status === "PENDING") {
                      return (
                        <div className="btnSepet disabled">Onay Bekleniyor</div>
                      );
                    }

                    if (paketDurumu?.status === "APPROVED") {
                      return (
                        <div className="btnSepet disabled">
                          Kayıt Yaptırılmış
                        </div>
                      );
                    }

                    return (
                      <button
                        onClick={() => setPopUp(true)}
                        className="btnSepet"
                      >
                        {katilan >= productDetail.capacity
                          ? "Ön kayıt yaptır"
                          : "Kayıt Oluştur"}
                      </button>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <SikcaSorulan />
      </div>

      {popUp && (
        <div className="popupUrunDetay">
          <div className="popup-inner">
            <div className="IBAN">
              <h4>Ödenecek Tutar: {productDetail.price} TL</h4>
              <p>İş Bankası</p>
              <p>Birlikte Spor kulübü iktisadi işletmesi</p>
              <p>TR42 0006 4000 0016 3110 4079 92</p>
            </div>

            <div className="avatar">
              <input
                type="file"
                accept="image/*"
                className="upload-input"
                id="kapakFoto"
                onChange={handleKapakImageChange}
                style={{ display: "none" }}
              />

              <label htmlFor="kapakFoto" className="kapsayiciButton">
                {coverImage ? (
                  <img
                    className="kapakImgg"
                    src={URL.createObjectURL(coverImage)}
                    alt="kapakResmi"
                  />
                ) : (
                  <div className="Text">
                    <ImageSearchIcon />
                    Lütfen Ödeme Dekontu Yükleyin
                  </div>
                )}
              </label>
            </div>

            <div className="popup-buttons">
              <button
                onClick={() => {
                  setPopUp(false);
                  setCoverImage(null);
                }}
                className="cancel"
              >
                İptal
              </button>
              <button onClick={() => handleSepeteEkle()} className="confirm">
                Kayıt İsteği Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaketDetay;
