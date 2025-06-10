import "./Politika.scss";

const KVKK = () => {
  return (
    <div className="politika container">
      <h1>
        Birlikte Spor Kulübü <br /> KVKK Aydınlatma Metni
      </h1>

      <div>
        <h2>1. Veri Sorumlusu</h2>
        <p>Birlikte Spor Kulübü</p>
        <p>
          <strong>Adres:</strong> [Kulüp Adresi]
        </p>
        <p>
          <strong>Telefon:</strong> [Kulüp Telefonu]
        </p>
        <p>
          <strong>E-posta:</strong> [Kulüp E-posta Adresi]
        </p>
      </div>

      <div>
        <h2>2. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
        <p>
          Kişisel verileriniz; üyelik, spor faaliyetlerine katılım, iletişim ve
          bilgilendirme süreçlerinde doğrudan sizden veya yasal mevzuat
          kapsamında üçüncü kişilerden toplanmaktadır.
        </p>
        <p>
          Verilerinizin işlenmesi, 6698 sayılı KVKK'nın 5. ve 6. maddeleri
          uyarınca; açık rızanızın alınması, yasal yükümlülüklerin yerine
          getirilmesi, sözleşmenin ifası veya hukuki menfaatlerimizin korunması
          gibi hukuki sebeplere dayanmaktadır.
        </p>
      </div>

      <div>
        <h2>3. İşlenen Kişisel Veriler</h2>
        <ul>
          <li>Kimlik ve iletişim bilgileri</li>
          <li>Sağlık ve sporcu bilgileri</li>
          <li>Finansal ve ödeme bilgileri</li>
          <li>Görsel ve işitsel kayıtlar</li>
          <li>Diğer ilgili bilgiler</li>
        </ul>
      </div>

      <div>
        <h2>4. Kişisel Verilerin İşlenme Amaçları</h2>
        <ul>
          <li>Üyelik işlemleri ve spor faaliyetlerinin yürütülmesi</li>
          <li>Sağlık ve güvenlik önlemlerinin alınması</li>
          <li>Kulüp içi iletişim ve bilgilendirme</li>
          <li>Kanuni yükümlülüklerin yerine getirilmesi</li>
          <li>Hizmetlerin iyileştirilmesi</li>
        </ul>
      </div>

      <div>
        <h2>5. Kişisel Verilerin Aktarılması</h2>
        <p>
          Kişisel verileriniz, yukarıdaki amaçlar doğrultusunda gerekli görülen
          kamu kurumları, iş ortakları ve hizmet sağlayıcılarla paylaşılabilir.
        </p>
      </div>

      <div>
        <h2>6. Kişisel Veri Sahibinin Hakları</h2>
        <p>
          KVKK kapsamında kişisel veri sahipleri olarak, aşağıdaki haklara
          sahipsiniz:
        </p>
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenen veriler hakkında bilgi talep etme</li>
          <li>Yanlış veya eksik verilerin düzeltilmesini isteme</li>
          <li>Verilerin silinmesini veya yok edilmesini talep etme</li>
          <li>İşlenen verilerin üçüncü kişilere aktarılmasını sınırlandırma</li>
          <li>Rızanızı geri çekme hakkı</li>
          <li>
            Haklarınızı kullanmak için veri sorumlumuzla iletişime
            geçebilirsiniz.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KVKK;
