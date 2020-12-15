import React from "react";
import ReactHighLight from "react-highlight";
import "highlight.js/styles/atelier-sulphurpool-light.css";

export default function CodeBlock(props: any) {
  return <ReactHighLight className="javascript">{props.value}</ReactHighLight>;
}
