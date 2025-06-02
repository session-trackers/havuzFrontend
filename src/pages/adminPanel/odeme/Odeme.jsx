import { useState } from "react";
import Loading from "../../loading/Loading";
import "./Odeme.scss";

const Odeme = () => {
  const [isLoading, setIsloading] = useState(false);

  return (
    <div className="projeList">
      <div className="title">
        <h4>Ödeme Bölümü</h4>
        <hr />
      </div>

      {isLoading ? <Loading /> : <form className="projeList"></form>}
    </div>
  );
};

export default Odeme;
