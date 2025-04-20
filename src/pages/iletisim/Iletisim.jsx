import "./Iletisim.scss";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

const Iletisim = () => {
  return (
    <div className="iletisim">
      <div className="container">
        <div className="content">
          <div className="map">
            <iframe
              className="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.9363330017595!2d26.4211555!3d40.143701899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b1077d37587b1d%3A0x9ce8f923e7dd257b!2sBarbaros%2C%20Burdur%20Sk.%20No%3A6%2C%2017020%20%C3%87anakkale%20Merkez%2F%C3%87anakkale!5e0!3m2!1str!2str!4v1743773908374!5m2!1str!2str"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="infoIletisim">
            <div className="itemIletisim">
              <h3>Adres Bilgilerimiz</h3>
              <p>Barbaros Mah. Burdur Sok. Ören Apt. No:6 Merkez/Çanakkale</p>
            </div>

            <div className="itemIletisim">
              <h3>Telefon Numaralarımız</h3>
              <div className="itemList">
                <LocalPhoneIcon />
                <p>
                  <a href="tel:+905071131234">+90 507 113 12 34</a>
                </p>
              </div>
            </div>

            <div className="itemIletisim">
              <h3>Medya Hesaplarımız</h3>
              <div className="medyas">
                <a
                  href="mailto:info@dikawnendustriyel.com"
                  className="itemList"
                >
                  <EmailIcon />
                  <p>info@dikawnendustriyel.com</p>
                </a>
                <a
                  id="sea"
                  target="_blank"
                  href="https://www.instagram.com/dikawn.endustriyel"
                  className="itemList"
                >
                  <InstagramIcon />
                  <p>dikawn.endustriyel</p>
                </a>
              </div>
            </div>

            <div className="itemIletisim">
              <h3>Mesai Saatlerimiz</h3>
              <div className="medyas">
                <div className="itemList">
                  <h4>Haftaiçi:</h4>
                  <p>08.00 - 19.00</p>
                </div>
                <div className="itemList">
                  <h4>Hafta Sonu:</h4>
                  <p>08.00 - 19.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iletisim;
