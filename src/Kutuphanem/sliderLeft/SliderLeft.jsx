import "./SliderLeft.scss";
const SliderLeft = () => {
  return (
    <div className="sliderLeft">
      <div className="child">
        <div className="img">
          <img src="/images/slider/duyuru.png" alt="" />
        </div>
        <div className="textChild">
          <h3>Duyurular</h3>
        </div>
      </div>
      <div className="child">
        <div className="img">
          <img src="/images/slider/kadro.png" alt="" />
        </div>
        <div className="textChild">
          <h3>Kadro</h3>
        </div>
      </div>
    </div>
  );
};

export default SliderLeft;
