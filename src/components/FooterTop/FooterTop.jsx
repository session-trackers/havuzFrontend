import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import "./FooterTop.scss";

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
          <MapIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>Adres İçin</h3>
            <p>Barbaros Mah. Burdur Sok. Ören Apt. No:6 Merkez/Çanakkale</p>
            <div>
              <a
                target="_blank"
                href="https://maps.app.goo.gl/XVfFMwNNfCAKELdg8"
              >
                <button>Yol Tarifi Al</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
