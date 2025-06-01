import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSelectedHoca } from "../../../redux/slices/kadroSlice";

const CategorySingleDown = ({ kadro, selectedHoca }) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const location = useLocation();

  const handleHocaChange = (event) => {
    const newId = event.target.value;
    setSelectedId(newId);
  };

  useEffect(() => {
    setSelectedId(null);
    dispatch(setSelectedHoca(null));
  }, [location.pathname]);

  useEffect(() => {
    if (!selectedId || !kadro.length) return;

    const selected = kadro.find((item) => item.id.toString() === selectedId);

    if (selected) {
      dispatch(setSelectedHoca(selected));
    } else {
      setSelectedId(null);
    }
  }, [selectedId, kadro]);

  return (
    <select
      value={selectedHoca ? selectedHoca.id : ""}
      onChange={handleHocaChange}
      required
    >
      <option disabled value="">
        Hoca Seç
      </option>

      {kadro?.map((kadroItem) => (
        <React.Fragment key={kadroItem.id}>
          <option value={kadroItem.id}>{kadroItem.categoryName}</option>
        </React.Fragment>
      ))}
    </select>
  );
};

export default CategorySingleDown;
