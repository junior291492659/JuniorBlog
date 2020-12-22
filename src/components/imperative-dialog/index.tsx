import React from "react";
import ReactDOM from "react-dom";
import type { DialogProps } from "../plain-modal";

interface IProps {
  Component: React.FunctionComponent<DialogProps>;
  defaultProps?: object;
}

type RefType = {
  open(props: any): void;
} | null;

const ImperativeDialogController = React.forwardRef<RefType, IProps>(
  (props, ref) => {
    const { Component, defaultProps } = props;
    const renderKey = React.useRef(0);
    const [render, setRender] = React.useState<{ [key: string]: any } | null>(
      null
    );
    const [visible, setVisible] = React.useState(false);

    const onCancel = React.useCallback(() => setVisible(false), []);

    React.useImperativeHandle(ref, () => ({
      open: (props: any) => {
        ReactDOM.unstable_batchedUpdates(() => {
          renderKey.current += 1;
          setRender(props);
          setVisible(true);
        });
      },
    }));
    return render ? (
      <Component
        key={renderKey.current}
        {...defaultProps}
        {...render}
        visible={visible}
        onClose={onCancel}
        afterClose={() => setRender(null)}
      />
    ) : null;
  }
);

export function useImperativeDialog(
  Component: React.FunctionComponent,
  defaultProps?: any
) {
  const ref = React.useRef<RefType>(null!);
  const component = React.useMemo(
    () => (
      <ImperativeDialogController
        Component={Component}
        ref={ref}
        defaultProps={defaultProps}
      />
    ),
    [Component, defaultProps]
  );
  const open = React.useCallback(
    (props: any, e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (ref.current)
        ref.current.open(
          e ? { mousePosition: { x: e.pageX, y: e.pageY }, ...props } : props
        );
      else {
        console.warn("ref.current is undefined");
      }
    },
    []
  );
  return [component, open] as const;
}
