import "./AdminProjeler.scss";
import ListCardDelete from "../../components/listCardDelete/ListCardDelete";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Loading from "../loading/Loading";
import Pagination from "../../Kutuphanem/Pagination/Pagination";

const AdminProjeSil = () => {
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
    const fetchCategoryies = async () => {
      setIsLoading(true);
      try {
        const responseCategories = await axios.get(
          `${BASE_URL}/api/v1/category`
        );
        setCategories(responseCategories.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryies();
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
          <label className="secilenBolum">
            Kategori:
            <select
              onChange={(e) => handleChangeSelectedCategory(e.target.value)}
              value={selectedCategoryLinkName ? selectedCategoryLinkName : ""}
            >
              <option disabled value="">
                Kategori Seçiniz
              </option>
              {categories.map((item) => (
                <option key={item.id} value={item.linkName}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          {selectedCategoryLinkName && (
            <>
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
            </>
          )}

          {selectedCategoryLinkName && currentItems.length === 0 && (
            <p>Bu kategoride hiç ürün bulunamadı.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProjeSil;
