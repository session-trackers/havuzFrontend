import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import SegmentIcon from "@mui/icons-material/Segment";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogin, role } = useSelector((state) => state.authSlice);
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigationData = [
    {
      label: "Profil", // tıklanabilir başlık
      submenu: [
        { to: "/profil/bilgiler", label: "Bilgilerim" },
        { to: "/profil/devamsizlik", label: "Devamsızlıklarım" },
        { to: "/profil/seanslarim", label: "Seanslarım" },
        { to: "/profil/siparislerim", label: "Siparişlerim" },
      ],
    },
    { to: "/", label: "Anasayfa" },
    { to: "/paketler", label: "Paketlerimiz" },
    { to: "/duyurular", label: "Duyurular" },
    { to: "/hakkimizda", label: "Biz Kimiz" },
    { to: "/antrenorler", label: "Antrenörler" },
    { to: "/havuzlar", label: "Havuzlar" },

    // Daha fazla menü elemanı ekleyebilirsin
  ];

  const navigationDataDesktop = [
    { to: "/", label: "Anasayfa" },
    { to: "/paketler", label: "Paketlerimiz" },
    { to: "/duyurular", label: "Duyurular" },
    { to: "/hakkimizda", label: "Biz Kimiz" },
    { to: "/antrenorler", label: "Antrenörler" },
    { to: "/havuzlar", label: "Havuzlar" },

    // Daha fazla menü elemanı ekleyebilirsin
  ];

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isMenuOpen) {
        if (currentScrollY > lastScrollY) {
          document.querySelector(".header")?.classList.add("hide");
        } else {
          document.querySelector(".header")?.classList.remove("hide");
        }
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="headerTop">
        <div className="container">
          <div className="headerTopWrapper">
            <div className="slogan">
              <span>Kalıcı iz, zamansız etki!</span>
            </div>
            <div className="iconss">
              {!isLogin ? (
                <>
                  <Link to="/" className="none">
                    <span>Kayıt Ol</span>
                  </Link>
                  <Link to="/customerlogin" className="cizgili none">
                    <span>Kayıt Sorgula</span>
                  </Link>
                </>
              ) : role === "CUSTOMER" ? (
                <Link to="/profil/bilgiler" className="cizgili none">
                  <PersonIcon className="icon" />
                  <span>Profilim</span>
                </Link>
              ) : (
                <Link to="/admin/seansekle" className="cizgili none">
                  <PersonIcon className="icon" />
                  <span>Admin Paneli</span>
                </Link>
              )}

              <a
                href="https://www.instagram.com/birlikte.spor.kulubu/?hl=tr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="icon" />
              </a>
              <a
                href="https://wa.me/905303787727"
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
                src="/images/logo/logo2.png"
                alt="Logo"
                className="logoImg"
              />
            </Link>

            <div className="desktopMenu">
              <nav>
                <ul>
                  {navigationDataDesktop.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div
              className="hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <CloseIcon /> : <SegmentIcon />}
            </div>
          </div>
        </div>
      </div>

      <div className={`sideMenu ${isMenuOpen ? "open" : ""}`}>
        <div className="sideMenuLogo">
          <img src="images/hakkimizda/looo2.png" alt="" />
        </div>
        <div className="sideMenuContent">
          <nav>
            <ul>
              {navigationData.map((item, index) => {
                if (item.submenu) {
                  return (
                    <li className="submenuToggleLi" key={index}>
                      <div
                        className="submenuToggle"
                        onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                      >
                        {item.label}
                        <KeyboardArrowDownIcon />
                      </div>
                      {isProfileMenuOpen && (
                        <ul className="submenu">
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.to}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }
                return (
                  <li key={index}>
                    <Link to={item.to} onClick={() => setIsMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="sideMenuFooter">
          <button className="register">Kayıt Ol</button>
          <button className="login">Kayıt Sorgulama</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
