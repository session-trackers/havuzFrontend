import React from "react";
import "./Udemy.scss";
import Baslik from "../../Kutuphanem/baslik/Baslik";
import { courses } from "./Udemydata.json";
import { Link } from "react-router-dom";

const Udemy = () => {
  return (
    <div className="udemy">
      <div className="container">
        <div className="udemyContent">
          <Baslik
            title={"Udemy Kurslarımız"}
            desc={"Udemy’deki eğitimlerimiz!"}
          />
          <div className="course-grid">
            {courses.map((course, index) => (
              <a
                href={course.link}
                target="_blank"
                className="course-card"
                key={index}
              >
                <img src={course.image} alt={course.title} />
                <div className="card-content">
                  <h3>{course.title}</h3>
                  <p className="description">{course.description}</p>
                  <p className="author">{course.author}</p>
                  <div className="badges">
                    {course.badge && (
                      <span className="badge">{course.badge}</span>
                    )}

                    <span className="reviews">{course.reviews} kişi</span>
                    <span className="duration">Toplam {course.duration}</span>
                  </div>
                  <div className="meta">
                    <span>{course.lessons}</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="footer">
                    <span className="price"></span>
                    <button>Kursa Git</button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Udemy;
