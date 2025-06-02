import "./Devamsizlik.scss";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

const KisiAdresleri = () => {
  return (
    <div className="kisiAdresleri">
      <div className="title">
        <h3>Devamsizlik</h3>
      </div>

      <hr />

      <div className="papers"></div>
    </div>
  );
};

export default KisiAdresleri;
