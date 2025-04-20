import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa her değiştiğinde en üst konuma kaydırma
  }, [location]);

  return null; // Hiçbir şey render etmiyor, sadece scroll kontrolü yapıyor
};

export default ScrollToTop;
