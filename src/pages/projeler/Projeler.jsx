import "./Projeler.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Loading from "../loading/Loading";
import Pagination from "../../Kutuphanem/Pagination/Pagination";
import SideBar from "../../Kutuphanem/urunler/sidebar/SideBar";
import List from "../../Kutuphanem/urunler/list/List";
import { useNavigate, useParams } from "react-router-dom";
import CategoryName from "../../Kutuphanem/categoryName/CategoryName";

const Projeler = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projeler, setProjeler] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const { linkName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryies, setCategoryies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const categoriesPromise = axios.get(`${BASE_URL}/api/v1/category`);
        const postsPromise = axios.get(
          `${BASE_URL}/api/v1/post/category/name?linkName=${linkName}`
        );
        const selectedCategoryPromise = axios.get(
          `${BASE_URL}/api/v1/category/get-by-link-name?linkName=${linkName}`
        );

        const [categoriesResponse, postsResponse, selectedCategoryResponse] =
          await Promise.all([
            categoriesPromise,
            postsPromise,
            selectedCategoryPromise,
          ]);

        setCategoryies(categoriesResponse.data);
        setProjeler(postsResponse.data);
        setSelectedCategory(selectedCategoryResponse.data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [linkName]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Sidebar'ı açma ve kapama işlemi
  };

  const filterByRoomCount = (yeniCategory) => {
    navigate(`/kategoriler/${yeniCategory}`); // Kesin yolu kullan
    setSidebarOpen(false);
  };

  console.log(selectedCategory);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="projeler">
      <CategoryName
        title={selectedCategory?.name}
        img={selectedCategory?.coverImage?.filename}
      />

      <div className="container">
        <div className="contentProjeler">
          <SideBar
            categories={categoryies}
            selectedCategoryName={selectedCategory?.name}
            filterByRoomCount={filterByRoomCount}
            sidebarOpen={sidebarOpen}
          />

          <div className="contentProjelerRight">
            <List
              projeler={projeler}
              currentItems={currentItems}
              toggleSidebar={toggleSidebar}
            />

            <Pagination
              itemsPerPage={9}
              items={projeler}
              setCurrentItems={setCurrentItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projeler;
