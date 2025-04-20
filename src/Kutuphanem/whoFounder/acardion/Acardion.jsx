import "./Acardion.scss";

function Acardion({ users }) {
  return (
    <div className="acardion-template">
      <ul className="acardion">
        {users?.map((user, index) => (
          <li key={index}>
            <img src={user.img} alt="" />
            <div className="content">
              <span>
                <h2>{user.name}</h2>
                <p>{user.job}</p>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Acardion;
