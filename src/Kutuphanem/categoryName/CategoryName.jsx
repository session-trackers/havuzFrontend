import "./CategoryName.scss";

const CategoryName = ({ img, title }) => {
  return (
    <div className="categoryName">
      <img src={img} alt="" />
      <div className="container">
        <div className="bannerText">
          <div className="title">
            <h1>{title}</h1>
          </div>
        </div>
      </div>

      <div className="background"></div>
    </div>
  );
};

export default CategoryName;
