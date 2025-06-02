import "./SiparisMusteri.scss";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/baseApi";
import api from "../../../api/api";

const SiparisMusteri = () => {
  return (
    <div className="siparisBilgileri">
      <div className="title">
        <h3>Sipariş Bilgileriniz</h3>
      </div>

      <hr />

      <div className="order-page">
        <table className="order-table">
          <thead>
            <tr>
              <th>Paket Adı</th>
              <th>Toplam Fiyat</th>
              <th>Durum</th>
              <th>Detay</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aralık 2025 Sabah</td>
              <td>300₺</td>
              <td>Onaylandı</td>
              <td>
                <button className="btn-detail">Detay</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiparisMusteri;
