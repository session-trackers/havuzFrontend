import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSelectedSeans } from "../../../redux/slices/seansSlice";

const SeansSingleDown = ({ seanses, selectedSeans }) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const location = useLocation();

  const handleSeansChange = (event) => {
    const newId = event.target.value;
    setSelectedId(newId);
  };

  useEffect(() => {
    setSelectedId(null);
    dispatch(setSelectedSeans(null));
  }, [location.pathname]);

  useEffect(() => {
    if (!selectedId || !seanses.length) return;
    const selected = seanses.find((item) => item.id.toString() === selectedId);
    if (selected) {
      dispatch(setSelectedSeans(selected));
    } else {
      setSelectedId(null);
    }
  }, [selectedId, seanses]);

  return (
    <select
      value={selectedSeans ? selectedSeans.id : ""}
      onChange={handleSeansChange}
      required
    >
      <option disabled value="">
        Seans Seç
      </option>

      {seanses?.map((seans) => (
        <option key={seans.id} value={seans.id}>
          {seans.name}
        </option>
      ))}
    </select>
  );
};

export default SeansSingleDown;
