import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerItem">
          <div className="logo">
            <a href="/">
              <img src="/images/logo/logo2.png" alt="Akıllı Logo" />
            </a>
          </div>
          <div className="metin">
            <p>
              Sporla gelişen, özgüveni yüksek ve sağlıklı nesiller
              yetiştiriyoruz.
            </p>
            <p>
              Uzman kadromuzla yüzmeden genel gelişime, her çocuğa özel bir spor
              yolculuğu sunuyoruz.
            </p>
          </div>
        </div>

        <div className="footerItem">
          <h3>Politika Ve Sözleşmeler</h3>
          <hr />
          <ul className="footerHizmet">
            <li>
              <span>KVKK ve Gizlilik Politikamız</span>
            </li>
            <li>
              <span>Satış Sözleşmemiz</span>
            </li>
            <li>
              <span>KVKK ve Gizlilik Politikamız</span>
            </li>
            <li>
              <span>Satış Sözleşmemiz</span>
            </li>
          </ul>
        </div>

        <div className="footerItem">
          <h3>Medya Hesaplarımız</h3>
          <hr />
          <ul className="medyaa">
            <li className="sag">
              <div className="yeap">
                <PhoneIcon />

                <a href="tel:+905303787727">
                  <span style={{ marginRight: "-0.5rem" }} className="ici">
                    +90 530 378 7727
                  </span>
                </a>
              </div>
            </li>

            <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/birlikte.spor.kulubu"
              >
                <InstagramIcon />
                <span>birlikte.spor.kulubu</span>
              </a>
            </li>

            <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/@BirlikteSporkulubu"
              >
                <img
                  src="/images/youtube.png"
                  style={{ width: "25px", height: "25px" }}
                  alt=""
                />
                <span>@BirlikteSporkulubu</span>
              </a>
            </li>

            <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@birlikte.sk"
              >
                <img
                  src="/images/tiktok.png"
                  style={{ width: "20px", height: "20px" }}
                  alt=""
                />
                <span>birlikte.sk</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr style={{ width: "100%", border: "1px solid #dee0ea" }} />

      <div className="ss">
        <p style={{ fontSize: "0.85rem" }}>
          Copyright 2025 © Birlikte Spor. Bütün Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
