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

import temizlik from "/images/kategoriResimleri/temizlik.jpeg";
import atik from "/images/kategoriResimleri/atik.jpeg";
import baski from "/images/kategoriResimleri/baski.jpeg";
import paket from "/images/kategoriResimleri/paket.jpeg";
import kagit from "/images/kategoriResimleri/kagit.jpeg";
import koruyucu from "/images/kategoriResimleri/koruyucu.jpeg";
import temizlikaraclari from "/images/kategoriResimleri/araclar.jpeg";
import mutfak from "/images/kategoriResimleri/mutfak.jpeg";
import camasir from "/images/kategoriResimleri/camasir.jpeg";
import kisisel from "/images/kategoriResimleri/kisisel.jpeg";
import bina from "/images/kategoriResimleri/bina.jpeg";
import dezenfektan from "/images/kategoriResimleri/dezenfektan.jpeg";
import oto from "/images/kategoriResimleri/oto.jpeg";
import copkutusu from "/images/kategoriResimleri/copkutusu.jpeg";
import kagithavlu from "/images/kategoriResimleri/kagithavlu.jpeg";
import tuvaletkagidi from "/images/kategoriResimleri/tuvaletkagidi.jpeg";
import koku from "/images/kategoriResimleri/koku.jpeg";
import klozetkapagi from "/images/kategoriResimleri/klozetkapagi.jpeg";
import dreampool from "/images/kategoriResimleri/dreampool.jpeg";

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
    genel: temizlik,
    kagit: kagit,
    paket: paket,
    atik: atik,
    baski: baski,
    koruyucu: koruyucu,
    temizlikaraclari: temizlikaraclari,

    mutfak: mutfak,
    camasir: camasir,
    kisisel: kisisel,
    bina: bina,
    dezenfektan: dezenfektan,
    ototemizlik: oto,
    copkovalari: copkutusu,
    kagithavludispenserleri: kagithavlu,
    tuvaletkagitdispenserleri: tuvaletkagidi,
    kokulandirmasistemi: koku,
    klozetkapak: klozetkapagi,
    dreampool: dreampool,
  };

  const titleMap = {
    genel: "Genel Tem. ve Hijyen Grubu.",
    kagit: "Sarf Kağıt Malz.",
    paket: "Paketleme Ürünleri",
    atik: "Atık Malzemeleri",
    baski: "Baskılı Sarf Malz.",
    koruyucu: "Kişisel Koruyucu Ekipmanlar",
    temizlikaraclari: "Temizlik Araçları",

    mutfak: "Mutfak Tem. ve Hijyen Grubu",
    camasir: "Çamaşır Tem. ve Hijyen Grubu",
    kisisel: "Kişisel Bakım ve Hijyen Grubu",
    bina: "Bina Tem. ve Hijyen Grubu",
    dezenfektan: "Dezenfektan Ürünleri",
    ototemizlik: "Oto Tem. ve Hijyen Grubu",
    copkovalari: "Çöp Kovaları",
    kagithavludispenserleri: "Kağıt Havlu Dispenserleri",
    tuvaletkagitdispenserleri: "Tuvalet Kağıdı Dispenserleri",
    kokulandirmasistemi: "Kokulandırma Sistemleri",
    klozetkapak: "Hij. Klozet Kapağı Sistemleri",
    dreampool: "DreamPool Ürünleri",
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
