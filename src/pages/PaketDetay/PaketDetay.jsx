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

const PaketDetay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [selectedImage, setSelectedImage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const fetchPaketDetay = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/package/by-id?id=${id}`
        );
        setProductDetail(response.data);
        setSelectedImage(response.data.coverImage?.url);
        setIsLoading(false);
      } catch (error) {
        console.log("fetchPaketDetay error:", error);
      }
    };

    fetchPaketDetay();
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(image.url); // Yeni resmi güncelle
  };

  if (isLoading) {
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
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <SikcaSorulan />
      </div>
    </div>
  );
};

export default PaketDetay;
