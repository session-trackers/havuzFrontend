import { useEffect, useState } from "react";
import "./MrGlide.scss";
import Glide from "@glidejs/glide";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const MrGlide = ({ onImageClick, images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    setActiveIndex(index);
    onImageClick(images[index]);
  };

  useEffect(() => {
    const glideResimm = new Glide(".glideResim", {
      type: "slider",
      startAt: 0,
      perView: 5,
      breakpoints: {
        1024: {
          perView: 4,
        },
        768: { perView: 1 },
      },
    });

    glideResimm.mount();

    return () => {
      glideResimm.destroy();
    };
  }, []);

  return (
    <div className="glideResim">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {images.map((image, index) => (
            <li
              key={index}
              className={`glide__slide ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => handleImageClick(index)}
              style={{
                cursor: "pointer",
                border:
                  window.innerWidth < "768px" && index === activeIndex
                    ? "2px solid black"
                    : "none",
              }}
            >
              <img src={image.filename} alt={`slide-${index}`} />
            </li>
          ))}
        </ul>
      </div>

      <div className="glide__arrows" data-glide-el="controls">
        <button
          style={{
            border: "none",
            fontSize: "10px",
            backgroundColor: "none",
            top: "45%",
            borderRadius: "30%",
            height: "70px",
            color: "black",
            boxShadow: "none",
            textShadow: "none",
            left: "-50px",
          }}
          className="glide__arrow glide__arrow--left"
          data-glide-dir="<"
        >
          <ChevronLeftIcon
            sx={{
              fontSize: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </button>
        <button
          style={{
            border: "none",
            fontSize: "10px",
            backgroundColor: "none",
            borderRadius: "30%",
            top: "45%",
            height: "70px",
            color: "black",
            right: "-50px",
            boxShadow: "none",
            textShadow: "none",
          }}
          className="glide__arrow glide__arrow--right"
          data-glide-dir=">"
        >
          <ChevronRightIcon
            sx={{
              fontSize: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </button>
      </div>

      <div className="glide__bullets" data-glide-el="controls[nav]">
        {images.map((item, index) => (
          <button
            key={index}
            className="glide__bullet"
            data-glide-dir={`=${index}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default MrGlide;
