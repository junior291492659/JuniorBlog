import React from "react";
import { Button } from "antd";
import style from "./index.module.less";
// const style = require("./index.module.less");

function Hello() {
  const name = "Typescript";

  return (
    <div>
      <h3 className={style.hello}>
        Hello, <span>{name}</span>
      </h3>
      <Button></Button>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </div>
  );
}
export default Hello;

// const enum Test {
//   A,
//   B,
//   C = 1,
//   D = 66,
//   E,
// }
// const temp = Test.D;
// console.log(temp);

// enum Directions {
//   Up,
//   Down,
//   Left,
//   Right,
// }

// let directions = [
//   Directions.Up,
//   Directions.Down,
//   Directions.Left,
//   Directions.Right,
// ];
// console.log(directions);
// console.log(Directions);
