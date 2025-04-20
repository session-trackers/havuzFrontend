import Baslik from "../../Kutuphanem/baslik/Baslik";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./Categories.scss";

import baski from "/images/kategoriResimleri/baski.jpeg";
import paketleme from "/images/kategoriResimleri/paket.jpeg";
import atik from "/images/kategoriResimleri/atik.jpeg";
import temizlik from "/images/kategoriResimleri/temizlik.jpeg";
import kagit from "/images/kategoriResimleri/kagit.jpeg";
import FadeInSection from "../../components/FadeInSection/FadeInSection";

const Categories = () => {
  return (
    <div className="categoriesPage">
      <div className="container">
        <Baslik title={"Ürün Yelpazemiz"} desc={"Lütfen bir kategori seçin!"} />
        <div className="categoryCardsContent">
          <CategoryCard
            categorylinkname={"temizlik"}
            categoryName={"Endüs. Temizlik Malz."}
            img={temizlik}
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
        </div>
      </div>
    </div>
  );
};

export default Categories;
