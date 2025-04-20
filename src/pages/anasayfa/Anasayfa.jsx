import "./Anasayfa.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Loading from "../loading/Loading";
import Slider from "../../Kutuphanem/Slider/Slider";
import AnaProduct from "../../Kutuphanem/anaProduct/AnaProduct";
import PopulerProduct from "../../Kutuphanem/populerProduct/PopulerProduct";
import WhoFounder from "../../Kutuphanem/whoFounder/WhoFounder";
import WhyOur from "../../Kutuphanem/whyOur/WhyOur";
import SikcaSorulan from "../../Kutuphanem/sikcaSorulan/SikcaSorulan";
import FullImg from "../../Kutuphanem/fullImg/FullImg";
import Carousel from "../../components/Carousel/Carousel";

const Anasayfa = () => {
  const [projeler, setProjeler] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/post/small?page=0&size=5`
        );
        setProjeler(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        console.log(response.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  console.log(projeler);

  return (
    <div className="anasayfa">
      <Slider loading={loading} />
      <Carousel />

      <AnaProduct />
      <FullImg />

      <PopulerProduct
        title={"Ürünlerimiz"}
        desc={"Tümü için ürünlerimiz sayfasına göz atın"}
        products={projeler}
      />

      <WhoFounder />
      <WhyOur loading={loading} />

      <div className="slider">
        <div className="slider-track">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="slide">
              <img src={`/images/karePost/${index + 1}.jpg`} alt={"dikawn"} />
            </div>
          ))}
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="slide">
              <img src={`/images/karePost/${index + 1}.jpg`} alt={"dikawn"} />
            </div>
          ))}
        </div>
      </div>

      <SikcaSorulan />
    </div>
  );
};

export default Anasayfa;
