import "./Projeler.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Loading from "../loading/Loading";
import Pagination from "../../Kutuphanem/Pagination/Pagination";
import SideBar from "../../Kutuphanem/urunler/sidebar/SideBar";
import List from "../../Kutuphanem/urunler/list/List";
import { useNavigate, useParams } from "react-router-dom";
import CategoryName from "../../Kutuphanem/categoryName/categoryName";

import temizlik from "/images/kategoriResimleri/temizlik.jpeg";
import atik from "/images/kategoriResimleri/atik.jpeg";
import baski from "/images/kategoriResimleri/baski.jpeg";
import paket from "/images/kategoriResimleri/paket.jpeg";
import kagit from "/images/kategoriResimleri/kagit.jpeg";

const Projeler = () => {
  const [selectedImg, setSelectedImg] = useState(temizlik);
  const [selectedTitle, setSelectedTitle] = useState("Kategori İsmi");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projeler, setProjeler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState([]);
  const { categoryname } = useParams();
  const navigate = useNavigate();

  const imageMap = {
    temizlik: temizlik,
    kagit: kagit,
    paket: paket,
    atik: atik,
    baski: baski,
  };

  const titleMap = {
    temizlik: "Endüs. Temizlik Malz.",
    kagit: "Sarf Kağıt Malz.",
    paket: "Paketleme Ürünleri",
    atik: "Atık Malzemeleri",
    baski: "Baskılı Sarf Malz.",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/post/category?category=${categoryname}`
        );
        const data = response.data;
        setProjeler(data);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setSelectedImg(imageMap[categoryname]);
    setSelectedTitle(titleMap[categoryname]);
  }, [categoryname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Sidebar'ı açma ve kapama işlemi
  };

  const filterByRoomCount = (yeniCategory) => {
    navigate(`/kategoriler/${yeniCategory}`); // Kesin yolu kullan
    setSidebarOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="projeler">
      <CategoryName title={selectedTitle} img={selectedImg} />
      <div className="container">
        <div className="contentProjeler">
          <SideBar
            categoryname={categoryname}
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
              itemsPerPage={8}
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
