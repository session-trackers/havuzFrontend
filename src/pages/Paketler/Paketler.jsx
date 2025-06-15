import Baslik from "../../Kutuphanem/baslik/Baslik";
import "./Paketler.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";
import SikcaSorulan from "../../Kutuphanem/sikcaSorulan/SikcaSorulan";
import TeamlisCard from "../../Kutuphanem/populerProduct/teamListCard/TeamListCard";

const Paketler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryies, setCategoryies] = useState([]);

  console.log(categoryies);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/package/public`);
        setCategoryies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categoriesPaged">
      <div className="container">
        <Baslik title={"Aktif Paketlerimiz"} desc={"Lütfen bir paket seçin!"} />
        <ul className="categoryCardsContent">
          {categoryies.map((item, index) => (
            <TeamlisCard key={index} product={item} />
          ))}
        </ul>

        <SikcaSorulan />
      </div>
    </div>
  );
};

export default Paketler;
