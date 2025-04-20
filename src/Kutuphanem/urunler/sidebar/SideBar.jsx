import "./SideBar.scss";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const SideBar = ({ categoryname, filterByRoomCount, sidebarOpen }) => {
  return (
    <sidebar className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="categories">
        <div className="title">
          <h3 style={{ fontSize: "1.2rem" }}>Kategoriler</h3>
          <hr />
        </div>
        <div className="listCategories">
          <ul>
            <li className={categoryname === "temizlik" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("temizlik")}>
                <span>Endüs. Temizlik Malz.</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "paket" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("paket")}>
                <span>Paketleme Ürünleri</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "kagit" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("kagit")}>
                <span>Sarf. Kağıt Malzemeleri</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>
            <li className={categoryname === "atik" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("atik")}>
                <span>Atık Malzemeleri</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>
            <li className={categoryname === "baski" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("baski")}>
                <span>Baskılı Sarf Malz.</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </sidebar>
  );
};

export default SideBar;
