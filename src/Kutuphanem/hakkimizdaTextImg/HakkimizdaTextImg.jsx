import "./HakkimizdaTextImg.scss";

import { img, title, text1, text2, text3 } from "./dataTextImg.json";
const HakkimizdaTextImg = () => {
  return (
    <div className="container">
      <div className="contentHakkimizda">
        <div className="hakkimizdaImg">
          <img src={img} alt="" />
        </div>

        <div className="hakkimizdaDetay">
          <h3>{title}</h3>
          <div className="desc">
            <p>{text1}</p>
            <p>{text2}</p>
            <p>{text3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HakkimizdaTextImg;
