import ReferansCard from "../../components/ReferansCard/ReferansCard";
import BaslikResimli from "../../Kutuphanem/baslikResimli/ProjectName";
import "./Referanslar.scss";

const Referanslar = () => {
  const businesses = [
    "Esas 17 Burda",
    "Girift Society",
    "İncelik Et ve Meze Lokantası",
    "H&H",
    "Ardes",
    "BIG Lounge",
    "DR Catering",
    "Yalova Restaurant",
    "Özel İsmail Kaymak Eğitim Kurumları",
    "Mackbear Coffee Co.",
    "Hayal Kahvesi",
    "Ahde Kantin ve Catering Ltd. Şti.",
  ];

  return (
    <div className="referanslar">
      <BaslikResimli />
      <div className="container">
        <div className="content">
          {Array.from({ length: 12 }, (_, index) => (
            <ReferansCard
              key={index}
              img={`/images/karePost/${index + 1}.jpg`}
              title={businesses[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Referanslar;
