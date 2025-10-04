import React from "react";

import smartImage from "../../../images/smart1Edited.jpg";

import styles from "./Grafic.module.css";

export default function Grafic() {
  return (
    <div className={styles.cont}>
      <div className={styles.chartArea} id="chartArea">
        <div className={styles.chartAreaBg}></div>
        <span className={styles.chartAreaText} id="chartAreaText">
          DEMO CHART
        </span>
        <img src={smartImage} alt="c-Bot Avatar" id="chartImage" />
      </div>
    </div>
  );
}
