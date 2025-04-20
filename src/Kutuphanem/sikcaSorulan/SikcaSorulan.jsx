import { useState } from "react";
import Baslik from "../baslik/Baslik";
import "./SikcaSorulan.scss";
import { faqs } from "./dataSikcaSorulan.json";

const SikcaSorulan = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container">
      <div className="sikcaSorulan">
        <Baslik title="Sıkça Sorulanlar" desc="Siz sorun biz cevaplayalım" />
        <div className="acardions">
          {faqs?.map((faq, index) => (
            <div
              className={`acardion ${openIndex === index ? "active" : ""}`}
              key={index}
            >
              <div
                className="acardionSummary"
                onClick={() => toggleAccordion(index)}
              >
                <p>{faq.question}</p>
                <span className="expandIcon">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              <div
                className="acardionDetails"
                style={{ display: openIndex === index ? "block" : "none" }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SikcaSorulan;
