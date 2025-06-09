import Baslik from "../../Kutuphanem/baslik/Baslik";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./Havuzlar.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";
import SikcaSorulan from "../../Kutuphanem/sikcaSorulan/SikcaSorulan";
import PoolRules from "../../Kutuphanem/PoolRules/PoolRules";

const Havuzlar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pools, setPools] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/pool`);
        setPools(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  console.log(pools);

  return (
    <div className="categoriesPage">
      <div className="container">
        <Baslik title={"Havuzlarımız"} desc={"Lütfen bir paket seçin!"} />
        <div className="categoryCardsContent">
          {pools.map((item, index) => (
            <CategoryCard
              key={index}
              linkName={`/havuzlar/${item.id}`}
              categoryName={item.name}
              img={item.coverImage?.url || null}
            />
          ))}
        </div>

        <PoolRules />
      </div>
    </div>
  );
};

export default Havuzlar;
