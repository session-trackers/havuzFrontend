import Baslik from "../../Kutuphanem/baslik/Baslik";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./Categories.scss";

import baski from "/images/kategoriResimleri/baski.jpeg";
import paketleme from "/images/kategoriResimleri/paket.jpeg";
import atik from "/images/kategoriResimleri/atik.jpeg";
import temizlik from "/images/kategoriResimleri/temizlik.jpeg";
import kagit from "/images/kategoriResimleri/kagit.jpeg";
import koruyucu from "/images/kategoriResimleri/koruyucu.jpeg";
import araclar from "/images/kategoriResimleri/araclar.jpeg";

import mutfak from "/images/kategoriResimleri/mutfak.jpeg";
import camasir from "/images/kategoriResimleri/camasir.jpeg";
import kisisel from "/images/kategoriResimleri/kisisel.jpeg";
import bina from "/images/kategoriResimleri/bina.jpeg";
import dezenfektan from "/images/kategoriResimleri/dezenfektan.jpeg";
import oto from "/images/kategoriResimleri/oto.jpeg";
import copkutusu from "/images/kategoriResimleri/copkutusu.jpeg";
import kagithavlu from "/images/kategoriResimleri/kagithavlu.jpeg";
import tuvaletkagidi from "/images/kategoriResimleri/tuvaletkagidi.jpeg";
import koku from "/images/kategoriResimleri/koku.jpeg";
import klozetkapagi from "/images/kategoriResimleri/klozetkapagi.jpeg";
import dreampool from "/images/kategoriResimleri/dreampool.jpeg";

const Categories = () => {
  return (
    <div className="categoriesPage">
      <div className="container">
        <Baslik title={"Ürün Yelpazemiz"} desc={"Lütfen bir kategori seçin!"} />
        <div className="categoryCardsContent">
          <CategoryCard
            categorylinkname={"genel"}
            categoryName={"Genel Tem. ve Hijyen Grubu"}
            img={temizlik}
          />

          <CategoryCard
            categorylinkname={"mutfak"}
            categoryName={"Mutfak Tem. ve Hijyen Grubu"}
            img={mutfak}
          />

          <CategoryCard
            categorylinkname={"camasir"}
            categoryName={"Çamaşır Tem. ve Hijyen Grubu"}
            img={camasir}
          />

          <CategoryCard
            categorylinkname={"kisisel"}
            categoryName={"Kişisel Tem. ve Hijyen Grubu"}
            img={kisisel}
          />

          <CategoryCard
            categorylinkname={"bina"}
            categoryName={"Bina Tem. ve Hijyen Grubu"}
            img={bina}
          />

          <CategoryCard
            categorylinkname={"dezenfektan"}
            categoryName={"Dezenfektan Ürünleri"}
            img={dezenfektan}
          />

          <CategoryCard
            categorylinkname={"ototemizlik"}
            categoryName={"Oto Tem. ve Hijyen Grubu"}
            img={oto}
          />

          <CategoryCard
            categorylinkname={"copkovalari"}
            categoryName={"Çöp Kovaları"}
            img={copkutusu}
          />

          <CategoryCard
            categorylinkname={"kagithavludispenserleri"}
            categoryName={"Kağıt Havlu Dispenserleri"}
            img={kagithavlu}
          />

          <CategoryCard
            categorylinkname={"tuvaletkagitdispenserleri"}
            categoryName={"Tuvalet Kağıt Dispenserleri"}
            img={tuvaletkagidi}
          />

          <CategoryCard
            categorylinkname={"kokulandirmasistemi"}
            categoryName={"Kokulandırma Sistemleri"}
            img={koku}
          />

          <CategoryCard
            categorylinkname={"klozetkapak"}
            categoryName={"Hijy. Klozet Kapak Sistemleri"}
            img={klozetkapagi}
          />

          <CategoryCard
            categorylinkname={"dreampool"}
            categoryName={"DreamPool Ürünleri"}
            img={dreampool}
          />

          <CategoryCard
            categorylinkname={"temizlikaraclari"}
            categoryName={"Temizlik Araçları"}
            img={araclar}
          />

          <CategoryCard
            categorylinkname={"paket"}
            categoryName={"Paketleme Ürünleri"}
            img={paketleme}
          />

          <CategoryCard
            categorylinkname={"kagit"}
            categoryName={"Sarf Kağıt Malz."}
            img={kagit}
          />

          <CategoryCard
            categorylinkname={"atik"}
            categoryName={"Yüksek Kaliteli Atık Malz."}
            img={atik}
          />

          <CategoryCard
            categorylinkname={"baski"}
            categoryName={"Baskılı Sarf Malz."}
            img={baski}
          />
          <CategoryCard
            categorylinkname={"koruyucu"}
            categoryName={"Kişisel Koruyucu Malz."}
            img={koruyucu}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
