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
  const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);
  const [katilan, setKatilan] = useState(1);
  const { id } = useParams();
  const [popUp, setPopUp] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [paketDurumu, setPaketDurumu] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

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

        if (isLogin) {
          const paketDurumuResponse = await api.get(
            `${BASE_URL}/api/v1/customer-package/package-status?packageId=${id}`
          );
          setPaketDurumu(paketDurumuResponse.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.log("Veri çekme hatası:", error);
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

      setCoverImage(null);
      setPopUp(false);
      setIsSubmiting((prev) => !prev);
      setIsLoading(false);

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
          status: "success",
        })
      );
    }
  };

  if (isLoading && isAuthChecked) {
    return <Loading />;
  }

  console.log(paketDurumu);

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
                fiyat={productDetail.price}
                indirimliFiyat={productDetail.price}
              />

              <NameAndMarka
                marka={"Birlikte Spor Klübü"}
                name={productDetail.name}
                desc={productDetail.description}
              />

              <div className="buttons">
                <div className="sepeteEkle">
                  {isLogin ? (
                    paketDurumu.status === "REJECTED" ? (
                      <button
                        onClick={() => setPopUp(true)}
                        className="btnSepet"
                      >
                        {katilan >= productDetail.capacity
                          ? "Ön kayıt yaptır"
                          : "Kayıt Oluştur"}
                      </button>
                    ) : paketDurumu.status === "PENDING" ? (
                      <div className="btnSepet disabled">Onay Bekleniyor</div>
                    ) : paketDurumu.status === "APPROVED" ? (
                      <div className="btnSepet disabled">Kayıt Yaptırılmış</div>
                    ) : (
                      // paketDurumu yoksa veya başka bir değer varsa
                      <button
                        onClick={() => setPopUp(true)}
                        className="btnSepet"
                      >
                        {katilan >= productDetail.capacity
                          ? "Ön kayıt yaptır"
                          : "Kayıt Oluştur"}
                      </button>
                    )
                  ) : (
                    <Link to={"/customerregister"} className="btnSepet">
                      Önce Kayıt Ol
                    </Link>
                  )}
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
              <p>Faruk Özkurt | QNB Finansbank</p>
              <p>TR43 0045 0023 7894 2415 4568 7412</p>
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
