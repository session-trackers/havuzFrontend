import React from "react";
import "./Carousel.scss";
import { Link } from "react-router-dom";

const Carousel = () => {
  const cars = [
    {
      src: "/images/kategoriResimleri/temizlik.jpeg",
      alt: "Temizlik Ürünleri",
      kategori: "Temizlik Ürünleri",
      url: "/kategoriler/temizlik",
    },
    {
      src: "/images/kategoriResimleri/paket.jpeg",
      alt: "Paketleme Ürünleri",
      kategori: "Paketleme Ürünleri",
      url: "/kategoriler/paket",
    },
    {
      src: "/images/kategoriResimleri/atik.jpeg",
      alt: "Atık Malzemeleri",
      kategori: "Atık Malzemeleri",
      url: "/kategoriler/atik",
    },
  ];

  return (
    <div className="car-showcase">
      <Link to={cars[0].url} className="car-image left">
        <img src={cars[0].src} alt={cars[0].alt} />
        <div className="backText">
          <span>{cars[0].kategori}</span>
        </div>
      </Link>
      <Link to={cars[1].url} className="car-image center">
        <img src={cars[1].src} alt={cars[1].alt} />
        <div className="backText">
          <span>{cars[1].kategori}</span>
        </div>
      </Link>
      <Link to={cars[2].url} className="car-image right">
        <img src={cars[2].src} alt={cars[2].alt} />
        <div className="backText">
          <span>{cars[2].kategori}</span>
        </div>
      </Link>
    </div>
  );
};

export default Carousel;
