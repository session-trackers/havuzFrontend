import "./AdminProjeler.scss";
import ListCardDelete from "../../components/listCardDelete/ListCardDelete";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Loading from "../loading/Loading";
import Pagination from "../../Kutuphanem/Pagination/Pagination";

const Ogrenciler = () => {
  const [projeler, setProjeler] = useState([]);
  const [innialProje, setInnialProje] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryLinkName, setSelectedCategoryLinkName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = innialProje.filter((proje) =>
      proje.title.toLowerCase().includes(query)
    );

    setProjeler(filtered);
  };

  useEffect(() => {
    // fetchCategoryies();
  }, []);

  const handleChangeSelectedCategory = async (linkName) => {
    setSelectedCategoryLinkName(linkName);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/post/category/name?linkName=${linkName}`
      );
      setProjeler(response.data);
      setInnialProje(response.data);
    } catch (error) {
      console.error(error);
      alert("Bir Hata var");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Ürünler</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="listAdmin">
          <div className="arama">
            <label htmlFor="">
              Ürün Ara:
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </label>
          </div>

          <div className="listCardss">
            {currentItems.map((proje, index) => (
              <ListCardDelete key={index} proje={proje} />
            ))}
          </div>

          <Pagination
            itemsPerPage={8}
            items={projeler}
            setCurrentItems={setCurrentItems}
          />

          {selectedCategoryLinkName && currentItems.length === 0 && (
            <p>Bu kategoride hiç ürün bulunamadı.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Ogrenciler;
