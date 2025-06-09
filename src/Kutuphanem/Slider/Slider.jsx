import { useEffect } from "react";
import Glide from "@glidejs/glide";
import "./Sldier.scss";
import { dataSlider } from "./dataSlider.json";

const Slider = ({ loading }) => {
  useEffect(() => {
    const glideSlider = new Glide(".glideSlider", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      autoplay: 3000,
    });

    const applyAnimation = () => {
      // Tüm slaytlardan fade-in sınıfını kaldır
      const allTitles = document.querySelectorAll(".glide__slide .title");
      allTitles.forEach((el) => {
        el.classList.remove("fade-in-title");

        // animasyonu sıfırlamak için force reflow
        void el.offsetWidth;
      });

      // Şu anki aktif slaytı seç
      const currentTitle = document.querySelector(
        ".glide__slide--active .title"
      );

      if (currentTitle) {
        // Küçük bir gecikmeyle fade-in sınıfı eklenir
        setTimeout(() => {
          currentTitle.classList.add("fade-in-title");
        }, 100);
      }
    };

    glideSlider.on("mount.after", applyAnimation);
    glideSlider.on("run.after", applyAnimation);

    glideSlider.mount();

    return () => {
      glideSlider.destroy();
    };
  }, [loading]);

  return (
    <div className="glideSlider">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {dataSlider.map((slide, index) => (
            <li className="glide__slide" key={index}>
              <img src={slide.img} alt="Bake and Bond" />
              <div className="container">
                <div className="bannerText">
                  <div className="title">
                    <h3>{slide.title}</h3>
                    <h5>{slide.subTitle}</h5>
                  </div>
                </div>
              </div>
              <div className="background"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Slider;
