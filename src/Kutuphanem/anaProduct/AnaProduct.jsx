import { Link } from "react-router-dom";
import "./AnaProduct.scss";
import { dataAnaProduct } from "./dataAnaProduct.json";

const AnaProduct = () => {
  return (
    <div className="anaProduct">
      <div className="container">
        <div className="populerProject">
          <div className="mobileTitle">
            <h3 style={{ fontSize: "1.5rem" }}>{dataAnaProduct.titleFull}</h3>
          </div>
          <div className="subDetay">
            <div className="imgContainer">
              <img className="first" src={dataAnaProduct.yImg} alt="" />
              <img className="seccond" src={dataAnaProduct.xImg} alt="" />
            </div>
            <div className="textContainer">
              <h3 className="projectNameAnaProduct">
                {dataAnaProduct.topSmallTitle}
              </h3>
              <h1>
                {dataAnaProduct.titleDev}{" "}
                <i>&apos;{dataAnaProduct.titleItalic}&apos;</i>{" "}
                {dataAnaProduct.titleDev2}
              </h1>

              <p className="desc">{dataAnaProduct.desc}</p>
              <div className="button">
                <Link to={dataAnaProduct.link}>
                  {dataAnaProduct.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaProduct;
