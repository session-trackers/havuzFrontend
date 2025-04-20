import { Link } from "react-router-dom";
import Baslik from "../baslik/Baslik";
import "./FullImg.scss";
import { dataFullImg } from "./dataFullImg.json";

const FullImg = () => {
  return (
    <div className="fullImg">
      <div className="container">
        <div className="fullImgContent">
          <Baslik title={dataFullImg.title} desc={dataFullImg.desc} />
          <Link to={dataFullImg.link} className="btn-fullImg">
            {dataFullImg.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullImg;
