import React from "react";
import style from "./index.module.less";

function AnotherHello() {
  const name = "Typescript";

  return (
    <div className={style.container}>
      <h3>
        Hello, <span>{name}, I am another Hello component</span>
      </h3>
    </div>
  );
}
export default AnotherHello;
