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
            <li className={categoryname === "genel" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("genel")}>
                <span>Genel Tem. ve Hij. Grb.</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "mutfak" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("mutfak")}>
                <span>Mutfak Tem. ve Hij. Grb.</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "camasir" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("camasir")}>
                <span>Çamaşır Tem. ve Hij. Grb.</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "kisisel" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("kisisel")}>
                <span>Kişisel Bakım ve Hij. Grb.</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "bina" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("bina")}>
                <span>Bina Tem. ve Hij. Grb.</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "dezenfektan" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("dezenfektan")}>
                <span>Dezanfektan</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "ototemizlik" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("ototemizlik")}>
                <span>Oto Temizlik Grb.</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li
              className={categoryname === "temizlikaraclari" ? "selected" : ""}
            >
              <button onClick={() => filterByRoomCount("temizlikaraclari")}>
                <span>Temizlik Araçları</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "copkovalari" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("copkovalari")}>
                <span>Çöp Kovaları</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li
              className={
                categoryname === "kagithavludispenserleri" ? "selected" : ""
              }
            >
              <button
                onClick={() => filterByRoomCount("kagithavludispenserleri")}
              >
                <span>Kagit Havlu Dispenserleri</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li
              className={
                categoryname === "tuvaletkagitdispenserleri" ? "selected" : ""
              }
            >
              <button
                onClick={() => filterByRoomCount("tuvaletkagitdispenserleri")}
              >
                <span>Tuvalet Kagit Dispenserleri</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li
              className={
                categoryname === "kokulandirmasistemi" ? "selected" : ""
              }
            >
              <button onClick={() => filterByRoomCount("kokulandirmasistemi")}>
                <span>Kokulandırma Sistemleri</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>

            <li className={categoryname === "klozetkapak" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("klozetkapak")}>
                <span>Hijyenik Klozet Kapak Sist.</span>
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
            <li className={categoryname === "koruyucu" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("koruyucu")}>
                <span>Kişisel Koruyucu Malz.</span>
                <ChevronRightOutlinedIcon
                  style={{ color: "black", fontSize: "1rem" }}
                />
              </button>
            </li>
            <li className={categoryname === "dreampool" ? "selected" : ""}>
              <button onClick={() => filterByRoomCount("dreampool")}>
                <span>DreamPool Ürünleri</span>
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
