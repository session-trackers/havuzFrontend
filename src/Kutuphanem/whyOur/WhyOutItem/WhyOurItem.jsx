import "./WhyOurItem.scss";
const WhyOurItem = ({ post }) => {
  return (
    <li className="glide__slide">
      <div className="postSlide">
        <img src={`/images/postImg/${post.img}`} alt={post.title} />
        <div className="bottomBar">
          <h3>{post.title}</h3>
        </div>
      </div>
    </li>
  );
};

export default WhyOurItem;
