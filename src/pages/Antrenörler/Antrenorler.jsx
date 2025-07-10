import { useEffect, useState } from "react";
import ReferansCard from "../../components/ReferansCard/ReferansCard";
import BaslikResimli from "../../Kutuphanem/baslikResimli/ProjectName";
import "./Antrenorler.scss";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";
import Loading from "../loading/Loading";

const Antrenorler = () => {
  const [hocalar, setHocalar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFunc = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/coach`);
        setHocalar(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunc();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
