import "./SideBar.scss";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const SideBar = ({
  categories,
  selectedCategoryName,
  filterByRoomCount,
  sidebarOpen,
}) => {
  return (
    <sidebar className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="categories">
        <div className="title">
          <h3 style={{ fontSize: "1.2rem" }}>Kategoriler</h3>
          <hr />
        </div>
        <div className="listCategories">
          <ul>
            {categories.map((item, index) => (
              <li
                key={index}
                className={selectedCategoryName === item.name ? "selected" : ""}
              >
                <button onClick={() => filterByRoomCount(item.linkName)}>
                  <span>{item.name}</span>
                  <ChevronRightOutlinedIcon
                    style={{ color: "black", fontSize: "1rem" }}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </sidebar>
  );
};

export default SideBar;
