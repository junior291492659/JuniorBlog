import React from "react";
import { Tooltip } from "antd";
import { createUseStyles } from "react-jss";
import viewerMixinStyle from "../cssMixin";

interface ButtonProps {
  icon: JSX.Element;
  tooltip: string;
  disabled?: boolean;

  onClick?(): void;
}

const useStyles = createUseStyles({
  tooltip: {
    "& .ant-tooltip-inner": {
      color: "black",
      fontSize: 12,
      padding: [8, 12],
    },
  },
  button: {
    ...viewerMixinStyle.size24,
    ...viewerMixinStyle.flex,
    ...viewerMixinStyle.hover,

    margin: 10,
    fontSize: 18,

    cursor: "pointer",

    color: (props) => (props.disabled ? "rgb(81, 86, 93)" : "white"),
    pointerEvents: (props) => (props.disabled ? "none" : ""),
  },
});

export default function ImageViewerToolbarButton(props: ButtonProps) {
  const { icon, tooltip, disabled, onClick } = props;
  const classes = useStyles({ disabled });

  return (
    <Tooltip
      color={"#dee0e3" as any}
      overlayClassName={classes.tooltip}
      title={tooltip}
    >
      <div onClick={onClick} className={classes.button}>
        {icon}
      </div>
    </Tooltip>
  );
}
