import Baslik from "../baslik/Baslik";
import ProjelerGlide from "./ProjerlerGlide/ProjelerGlide";
import "./PopulerProduct.scss";

const PopulerProduct = ({ title, desc, products }) => {
  return (
    <div className="bestTeam">
      <div className="container">
        <div className="content">
          <div className="left">
            <Baslik title={title} desc={desc} />
          </div>
          <hr />
          <div className="TeamlistCards">
            <ProjelerGlide perView={3} products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulerProduct;
