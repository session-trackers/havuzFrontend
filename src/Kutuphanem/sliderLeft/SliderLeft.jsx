import { Link } from "react-router-dom";
import "./SliderLeft.scss";
const SliderLeft = () => {
  return (
    <div className="sliderLeft">
      <Link to={"/havuzlar"} className="child">
        <div className="img">
          <img src="/images/slider/duyuru.png" alt="" />
        </div>
        <div className="textChild">
          <h3>Havuzlar</h3>
        </div>
      </Link>
      <Link to={"/antrenorler"} className="child">
        <div className="img">
          <img src="/images/slider/kadro.png" alt="" />
        </div>
        <div className="textChild">
          <h3>Kadro</h3>
        </div>
      </Link>
    </div>
  );
};

export default SliderLeft;
