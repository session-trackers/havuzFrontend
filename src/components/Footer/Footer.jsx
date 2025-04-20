import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerItem">
          <div className="logo">
            <a href="/">
              <img src="/images/logo/logo.png" alt="Akıllı Logo" />
            </a>
          </div>
          <div className="metin">
            <p>
              Endüstriyel ihtiyaçlara özel çözümler sunan di-kawn, kaliteli
              üretim anlayışı ve müşteri odaklı yaklaşımıyla iş süreçlerine
              değer katar.
            </p>
            <p>
              Hijyenik, dayanıklı ve sürdürülebilir ürünlerle sektörde fark
              yaratıyoruz.
            </p>
          </div>
        </div>

        <div className="footerItem">
          <h3>Ürün Gamımız</h3>
          <hr />
          <ul className="footerHizmet">
            <li>
              <span>Baskılı Sarf Malzemeleri</span>
            </li>
            <li>
              <span>Yüksek Kaliteli Atık Poşetler</span>
            </li>
            <li>
              <span>Paketleme Ürünleri</span>
            </li>
            <li>
              <span>Endüstriyel Temizlik Malzemeleri</span>
            </li>
            <li>
              <span>Sarf Kağıt Malzemeleri</span>
            </li>
          </ul>
        </div>

        <div className="footerItem">
          <h3>İletişim Bilgilerimiz</h3>
          <hr />
          <ul>
            <li className="sag">
              <div className="yeap">
                <PhoneIcon />

                <a href="tel:+905071131234">
                  <span style={{ marginRight: "-0.5rem" }} className="ici">
                    +90 507 113 12 34
                  </span>
                </a>
              </div>
            </li>

            <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/dikawn.endustriyel"
              >
                <InstagramIcon />
                <span>dikawn.endustriyel</span>
              </a>
            </li>

            <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://maps.app.goo.gl/XVfFMwNNfCAKELdg8"
              >
                <MapIcon />
                <span>
                  Barbaros Mah. Burdur Sok. Ören Apt. No:6 Merkez/Çanakkale
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr style={{ width: "100%", border: "1px solid #dee0ea" }} />

      <div className="container">
        <p style={{ fontSize: "0.85rem" }}>
          Copyright 2025 © Di-Kawn. Bütün Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
