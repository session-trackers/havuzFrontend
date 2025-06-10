import "./PaketDetay.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Baslik from "../../Kutuphanem/baslik/Baslik";
import SikcaSorulan from "../../Kutuphanem/sikcaSorulan/SikcaSorulan";
import Loading from "../loading/Loading";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";
import MrGlide from "../../Kutuphanem/urunDetayGlide/MrGlide";
import NameAndMarka from "../../Kutuphanem/urunDetay/nameAndMarka/NameAndMarka";
import FiyatActions from "../../Kutuphanem/urunDetay/fiyatActions/FiyatActions";
import { useSelector } from "react-redux";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import api from "../../api/api";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

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
      } catch (error) {
        console.log("Veri çekme hatası:", error);
      } finally {
        // Her iki işlem de tamamlandıktan sonra loading false
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      if (isLogin) {
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
      } else {
        // Bir forma yönlendir
      }
      setIsLoading(false);
      setCoverImage(null);
      setPopUp(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading && isAuthChecked) {
    return <Loading />;
  }

  console.log(productDetail);

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
                  <button onClick={() => setPopUp(true)} className="btnSepet">
                    {katilan >= productDetail.capacity
                      ? "Ön kayıt yaptır"
                      : "Kayıt Oluştur"}
                  </button>
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
