import "./List.scss";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ListCard from "../listCard/ListCard";
import FadeInSection from "../../../components/FadeInSection/FadeInSection";

const List = ({ toggleSidebar, currentItems, projeler }) => {
  return (
    <div className="projeList">
      <div className="title">
        <div className="titleContent">
          <h3 style={{ fontSize: "1.2rem" }}>Kategorinin Ürünleri</h3>
          <div className="filterIconContent" onClick={toggleSidebar}>
            <FilterAltOutlinedIcon className="iconFilter" />
          </div>
        </div>
        <hr />
      </div>

      <div className="list">
        {projeler.length > 0 ? (
          currentItems?.map((proje, index) => (
            <FadeInSection>
              <ListCard key={index} proje={proje} />
            </FadeInSection>
          ))
        ) : (
          <p className="noDaire">Ürünler Bulunamadı...</p>
        )}
      </div>
    </div>
  );
};

export default List;
