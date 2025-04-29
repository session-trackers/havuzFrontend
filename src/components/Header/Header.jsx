import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header className="header">
      <div className="headerTop">
        <div className="container">
          <div className="headerTopWrapper">
            <div>
              <span>Kalıcı iz, zamansız etki!</span>
            </div>
            <div className="iconss">
              <span className="none">Bizlerle iletişime geçin</span>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
