import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Header.scss";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import SearchCard from "../SearchCard/SearchCard";
import { BASE_URL } from "../../config/baseApi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const menuCloseDelay = 300; // ms

  const navigationData = [
    { to: "/", label: "Anasayfa" },
    { to: "/kategoriler", label: "Ürünlerimiz" },
    { to: "/hakkimizda", label: "Hakkımızda" },
    { to: "/referanslar", label: "Referanslar" },
    { to: "/iletisim", label: "İletişim" },
  ];

  useEffect(() => {
    setIsMenuOpen(false); // sayfa değişince menü kapanır
  }, [location]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => {
    setTimeout(() => setIsMenuOpen(false), menuCloseDelay);
  };

  const fetchSearchProducts = async (title) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/post/search?title=${title}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setProducts([]);
    } else {
      setTimeout(() => fetchSearchProducts(value), 500);
    }
  };

  return (
    <header className="header">
      {/* Üst Header */}
      <div className="headerTop">
        <div className="container">
          <div className="headerTopWrapper">
            <div className={`slogan ${isSearchOpen ? "hide-mobile" : ""}`}>
              <span>Kalıcı iz, zamansız etki!</span>
            </div>

            {isSearchOpen && <div></div>}

            <div className="iconss">
              {isSearchOpen ? (
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Aramak için yazın..."
                  autoFocus
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              ) : (
                <span className="none">Bizlerle iletişime geçin</span>
              )}

              <button
                onClick={() => setIsSearchOpen(true)}
                className="buttonSearchContent"
              >
                <SearchIcon className="icon" />
              </button>

              <a
                href="https://www.instagram.com/dikawn.endustriyel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="icon" />
              </a>

              <a
                href="https://wa.me/905071131234"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Header */}
      <div className="headerBottom">
        <div className="container">
          <div className="headerWrapper">
            <Link className="logo" to="/">
              <img src="/images/logo/logo.png" alt="Logo" className="logoImg" />
            </Link>

            <nav className={`navigation ${isMenuOpen ? "open" : ""}`}>
              <ul className="menu-list">
                {navigationData.map(({ to, label }) => (
                  <li className="menu-list-item" key={to}>
                    <Link className="menu-link" to={to} onClick={closeMenu}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hamburger" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>

          {/* Arama Sonuçları */}
          {isSearchOpen && searchTerm && (
            <div className="searchWrapper">
              <div className="container">
                <div className="searchContent">
                  <div className="topSearchh">
                    <span>Bulunan Ürün: {products.length}</span>
                    <button
                      className="closeButton"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  <div className="listSearch">
                    {products?.map((product, index) => (
                      <SearchCard key={index} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
