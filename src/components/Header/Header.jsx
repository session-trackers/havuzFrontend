import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import SearchCard from "../SearchCard/SearchCard";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300); // 500ms (yarım saniye) gecikme
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const fetchSearchProducts = async (title) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/post/search?title=${title}`
      );
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value == "") {
                      setProducts(null);
                    } else {
                      setTimeout(() => {
                        fetchSearchProducts(e.target.value);
                      }, 500);
                    }
                  }}
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

      <div className="headerBottom">
        <div className="container">
          <div className="headerWrapper">
            <Link className="logo" to="/">
              <img
                style={{ borderRadius: "5px" }}
                src="/images/logo/logo.png"
                alt=""
              />
            </Link>

            <nav className={`navigation ${isMenuOpen ? "open" : ""}`}>
              <ul className="menu-list">
                <li className="menu-list-item">
                  <Link className="menu-link" to="/" onClick={closeMenu}>
                    Anasayfa
                  </Link>
                </li>
                <li>
                  <Link
                    className="menu-link"
                    to="/kategoriler"
                    onClick={closeMenu}
                  >
                    Ürünlerimiz
                  </Link>
                </li>
                <li className="menu-list-item">
                  <Link
                    className="menu-link"
                    to="/hakkimizda"
                    onClick={closeMenu}
                  >
                    Hakkımızda
                  </Link>
                </li>

                <li className="menu-list-item">
                  <Link
                    className="menu-link"
                    to="/referanslar"
                    onClick={closeMenu}
                  >
                    Referanslar
                  </Link>
                </li>

                <li className="menu-list-item">
                  <Link
                    className="menu-link"
                    to="/iletisim"
                    onClick={closeMenu}
                  >
                    İletişim
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="hamburger" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>

          {isSearchOpen && searchTerm !== "" && (
            <div className="searchWrapper">
              <div className="container">
                <div className="searchContent">
                  <button
                    className="closeButton"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    <CloseIcon />
                  </button>
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
