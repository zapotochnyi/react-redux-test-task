import React from "react";
import s from "./Loader.module.css";
//icon
import loader from "../../assets/loader.svg";

const Loader = () => {
  return (
    <div className={s.loader_wrap}>
      <img src={loader} alt="" />
    </div>
  );
};

export default Loader;
