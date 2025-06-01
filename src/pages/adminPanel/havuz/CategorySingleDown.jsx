import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSelectedPool } from "../../../redux/slices/poolSlice";

const CategorySingleDown = ({ pools, selectedPool }) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const location = useLocation();

  const handlePoolChange = (event) => {
    const newId = event.target.value;
    setSelectedId(newId);
  };

  useEffect(() => {
    setSelectedId(null);
    dispatch(setSelectedPool(null));
  }, [location.pathname]);

  useEffect(() => {
    if (!selectedId || !pools.length) return;

    const selected = pools.find((item) => item.id.toString() === selectedId);

    if (selected) {
      dispatch(setSelectedPool(selected));
    } else {
      setSelectedId(null);
    }
  }, [selectedId, pools]);

  return (
    <select
      value={selectedPool ? selectedPool.id : ""}
      onChange={handlePoolChange}
      required
    >
      <option disabled value="">
        Havuz Seç
      </option>

      {pools?.map((pool) => (
        <React.Fragment key={pool.id}>
          <option value={pool.id}>{pool.name}</option>
        </React.Fragment>
      ))}
    </select>
  );
};

export default CategorySingleDown;
