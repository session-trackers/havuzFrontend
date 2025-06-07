import { useState } from "react";
import Loading from "../../loading/Loading";
import "./Siparisler.scss";

const Siparisler = () => {
  const [isLoading, setIsloading] = useState(false);

  return (
    <div className="projeList">
      <div className="title">
        <h4>Sipariş Bölümü</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form className="projeList">
          <div></div>
        </form>
      )}
    </div>
  );
};

export default Siparisler;
