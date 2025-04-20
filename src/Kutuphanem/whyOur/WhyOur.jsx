import { useEffect } from "react";
import Glide from "@glidejs/glide";
import "./WhyOur.scss";
import WhyOurItem from "./WhyOutItem/WhyOurItem";
import { posts, iconImg, desc, title } from "./dataWhyOur.json";
import Counts from "../countSayi/Counts";

const WhyOur = ({ loading }) => {
  useEffect(() => {
    if (!loading) {
      const glidePosts = new Glide(".glide-posts", {
        type: "carousel",
        autoplay: 2700,
        perView: 4,
        gap: 20,
        breakpoints: {
          900: { perView: 3 },
          768: { perView: 2 },
          350: { perView: 1 },
        },
      });

      glidePosts.mount();

      return () => {
        glidePosts.destroy();
      };
    }
  }, [loading]);

  return (
    <div className="container">
      <div className="altKısım">
        <div className="anaBaslik">
          <h3 className="anaTitle">{title}</h3>
          <img src={iconImg} alt="Neden Biz" />

          <div className="anaDesc">
            <p>{desc}</p>
          </div>
          <Counts />
        </div>

        <div className="glide-posts">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {posts?.map((post, index) => (
                <WhyOurItem post={post} key={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyOur;
