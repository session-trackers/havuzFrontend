import "./ProjectName.scss";
import { img, title } from "./dataProjectName.json";

const ProjectName = () => {
  return (
    <div className="projectName">
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

export default ProjectName;
