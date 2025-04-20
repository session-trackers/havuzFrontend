import "./Baslik.scss";

function Baslik({ title, desc }) {
  return (
    <div className="anaTitle">
      <h3 className="title">
        {title}
      </h3>

      <p className="desc">
        {desc}
      </p>
    </div>
  );
}

export default Baslik;
