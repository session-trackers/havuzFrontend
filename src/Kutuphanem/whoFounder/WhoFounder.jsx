import Baslik from "../baslik/Baslik";
import Acardion from "./acardion/Acardion";
import "./WhoFounder.scss";
import { founderData, title, desc } from "./dataWho.json";
import Counts from "../countSayi/Counts";

const WhoFounder = () => {
  return (
    <div className="whoUsing">
      <div className="container">
        <div className="content">
          <Acardion users={founderData} />
          <div className="left">
            <Baslik title={title} />
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoFounder;
