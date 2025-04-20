import { Link } from "react-router-dom";
import "./ListCardDelete.scss";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const ListCardDelete = ({ proje }) => {
  const token = localStorage.getItem("authToken");
  const handleProjectDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/image/post?postId=${proje.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Silme işlemi başarılı:", response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="projeCardDelete">
      <div className="img">
        <img src={proje.coverImage} alt="" />
      </div>
      <div className="detayCard">
        <div className="desc">
          <div className="title">
            <h3>{proje.title}</h3>
          </div>
          <div className="text">
            <p>{proje.titleContent}</p>
          </div>
        </div>
        <div className="buttonCard">
          <Link
            to={`/urunler/${proje.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Ürüne Git</button>
          </Link>

          <div>
            <button onClick={handleProjectDelete} className="delete">
              Sil
            </button>
          </div>

          <Link to={`/admin/urunler/${proje.id}`}>
            <button className="update">Düzenle</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCardDelete;
