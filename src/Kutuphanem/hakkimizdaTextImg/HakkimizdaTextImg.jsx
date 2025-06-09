import "./HakkimizdaTextImg.scss";

import { title1, title2, text1, text2, text3, text4 } from "./dataTextImg.json";
const HakkimizdaTextImg = () => {
  return (
    <div className="container">
      <div className="contentHakkimizda">
        {/* <div className="hakkimizdaImg">
          <img src={img} alt="" />
        </div> */}

        <div className="hakkimizdaDetay">
          <h3>{title1}</h3>
          <div className="desc">
            <p>{text1}</p>
            <p>{text2}</p>
          </div>
        </div>

        <div className="hakkimizdaDetay">
          <h3>{title2}</h3>
          <div className="desc">
            <p>{text3}</p>
            <p>{text4}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HakkimizdaTextImg;
