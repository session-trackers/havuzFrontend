import React from "react";
import "./PoolRules.scss"; // SCSS dosyasını içe aktar
import data from "./dataPoolRules.json";
import Baslik from "../baslik/Baslik";

const PoolRules = () => {
  return (
    <div className="pool-rules">
      <Baslik title={"Havuz Kuralları"} desc={"Lütfen Kurallara Uyunuz"} />

      <ul className="pool-rules__list">
        {data.rules.map((rule, index) => (
          <li key={index}>
            <p>{rule}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoolRules;
