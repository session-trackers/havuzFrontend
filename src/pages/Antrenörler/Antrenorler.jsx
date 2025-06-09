import { useEffect, useState } from "react";
import ReferansCard from "../../components/ReferansCard/ReferansCard";
import BaslikResimli from "../../Kutuphanem/baslikResimli/ProjectName";
import "./Antrenorler.scss";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";

const Antrenorler = () => {
  const [hocalar, setHocalar] = useState([]);

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/coach`);
        setHocalar(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFunc();
  }, []);

  return (
    <div className="referanslar">
      <BaslikResimli />
      <div className="container">
        <div className="content">
          {hocalar?.map((item, index) => (
            <ReferansCard
              key={item.id}
              img={item?.coverImage.url}
              title={item.name}
              unvan={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Antrenorler;
