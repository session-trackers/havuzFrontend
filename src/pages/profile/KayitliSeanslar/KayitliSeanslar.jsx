import { useState } from "react";
import "./KayitliSeanslar.scss";
import api from "../../../api/api";

const KayitliSeanslar = () => {
  return (
    <div className="sifreDegistir">
      <div className="title">
        <h3>Kayıtlı Seanslar</h3>
      </div>

      <hr />
      <form className="bars"></form>
    </div>
  );
};

export default KayitliSeanslar;
