import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import "./FooterTop.scss";
import InstagramIcon from "@mui/icons-material/Instagram";

const FooterTop = () => {
  return (
    <div className="dikkat">
      <div className="container dikkatItems">
        <div className="dikkatItem">
          <PhoneIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>Bizlere Ulaşın: +90 507 113 12 34</h3>
            <p>
              Yukarıdaki telefon numarası ile gönül rahatlığıyla iletişim
              kurabilirsiniz.
            </p>
            <div>
              <a href="tel:+905071131234">
                <button>Hemen Ara</button>
              </a>
            </div>
          </div>
        </div>

        <div className="dikkatItem">
          <InstagramIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>Instagram Sayfamız</h3>
            <p>Bu serüvenle beraber hem eğlenin, hem öğrenin! </p>
            <div>
              <a
                target="_blank"
                href="https://www.instagram.com/birlikte.spor.kulubu"
              >
                <button>Sayfaya Git</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
