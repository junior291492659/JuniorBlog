import React from "react";
import { debounce } from "lodash-es";

interface IImageInfo {
  naturalWidth: number;
  naturalHeight: number;

  width: number;
  height: number;

  left: number;
  top: number;

  moveActive?: { x: number; y: number };
  zoomActive?: boolean | number;
}

const initialize = (
  el: HTMLImageElement | IImageInfo | HTMLElement
): IImageInfo => {
  const maxWidth = window.innerWidth * 0.8;
  const maxHeight = window.innerHeight * 0.8;
  const naturalWidth = "naturalWidth" in el ? el.naturalWidth : el.clientWidth;
  const naturalHeight =
    "naturalHeight" in el ? el.naturalHeight : el.clientHeight;
  let width = naturalWidth;
  let height = naturalHeight;
  let left = 0;
  let top = 0;

  if (width > maxWidth) {
    const ratio = width / maxWidth;
    width = maxWidth;
    height /= ratio;
  }
  if (height > maxHeight) {
    const ratio = height / maxHeight;
    height = maxHeight;
    width /= ratio;
  }

  left = (window.innerWidth - width) / 2;
  top = (window.innerHeight - height) / 2;
  return { width, height, left, top, naturalWidth, naturalHeight };
};

const scale = (originalInfo: IImageInfo, scaleFactor: number): IImageInfo => {
  const { naturalHeight, naturalWidth } = originalInfo;
  let { width, height, left, top } = originalInfo;
  width +=
    width > naturalWidth ? naturalWidth * scaleFactor : width * scaleFactor;
  height +=
    height > naturalHeight ? naturalHeight * scaleFactor : height * scaleFactor;
  left += (originalInfo.width - width) / 2;
  top += (originalInfo.height - height) / 2;
  return move(
    {
      width,
      height,
      left,
      top,
      naturalHeight,
      naturalWidth,
      zoomActive: -width,
    },
    { x: 0, y: 0 }
  );
};

const reset = (originalInfo: IImageInfo, initial?: boolean): IImageInfo => {
  const { width, height, naturalWidth, naturalHeight } = originalInfo;
  if (
    initial === false ||
    (initial !== true && width === naturalWidth && height === naturalHeight)
  )
    return { ...initialize(originalInfo), zoomActive: true };
  return {
    width: naturalWidth,
    height: naturalHeight,
    top: (window.innerHeight - naturalHeight) / 2,
    left: (window.innerWidth - naturalWidth) / 2,
    naturalWidth,
    naturalHeight,
    zoomActive: true,
  };
};

const resize = (originalInfo: IImageInfo): IImageInfo => {
  return {
    ...originalInfo,
    top: (window.innerHeight - originalInfo.height) / 2,
    left: (window.innerWidth - originalInfo.width) / 2,
  };
};

const move = (
  originalInfo: IImageInfo,
  { x, y }: { x: number; y: number }
): IImageInfo => {
  const { width, height } = originalInfo;
  let nextTop = originalInfo.top + y;
  let nextLeft = originalInfo.left + x;
  if (width < window.innerWidth) {
    if (nextLeft < 0) nextLeft = 0;
    if (nextLeft + width > window.innerWidth)
      nextLeft = window.innerWidth - width;
  } /* if (width >= window.innerWidth) */ else {
    if (nextLeft < window.innerWidth - width)
      nextLeft = window.innerWidth - width;
    if (nextLeft > 0) nextLeft = 0;
  }
  if (height < window.innerHeight) {
    if (nextTop < 0) nextTop = 0;
    if (nextTop + height > window.innerHeight)
      nextTop = window.innerHeight - height;
  } /* if (height >= window.innerHeight) */ else {
    if (nextTop < window.innerHeight - height)
      nextTop = window.innerHeight - height;
    if (nextTop > 0) nextTop = 0;
  }
  return {
    ...originalInfo,
    top: nextTop,
    left: nextLeft,
  };
};

// logic guessed from lark
const wheel = (originalInfo: IImageInfo, ev: WheelEvent): IImageInfo => {
  ev.preventDefault();
  if (!String(ev.deltaY).indexOf(".") || !ev.ctrlKey) {
    // scroll event
    return move(originalInfo, { x: -ev.deltaX, y: -ev.deltaY });
  }
  // not work on safari
  const wheelDelta = (t: any) => {
    let e = 1;
    return (
      t.deltaY
        ? (e = t.deltaY > 0 ? 1 : -1)
        : t.wheelDelta
        ? (e = -t.wheelDelta / 120)
        : t.detail && (e = t.detail > 0 ? 1 : -1),
      e
    );
  };
  const e = 0.025;
  const i = wheelDelta(ev);
  return scale(originalInfo, -i * e);
};

/* -webkit-GestureEvent */
interface GestureEvent extends Event {
  scale?: number;
}

const gesture = {
  start: (originalInfo: IImageInfo, ev: GestureEvent): IImageInfo => {
    ev.preventDefault();
    return { ...originalInfo, zoomActive: 1 };
  },
  change: (originalInfo: IImageInfo, ev: GestureEvent): IImageInfo => {
    ev.preventDefault();
    const { zoomActive } = originalInfo;
    if (zoomActive === undefined || zoomActive === false || zoomActive > 0) {
      return {
        ...originalInfo,
        ...scale(
          originalInfo,
          (ev.scale as number) - ((zoomActive || ev.scale) as number)
        ),
        zoomActive: ev.scale,
      };
    }
    return originalInfo;
  },
  end: (originalInfo: IImageInfo, ev: GestureEvent): IImageInfo => {
    return originalInfo;
  },
};

const pointer = {
  down(
    originalInfo: IImageInfo,
    ev: PointerEvent | Omit<PointerEvent, "movementX">
  ): IImageInfo {
    return { ...originalInfo, moveActive: { x: ev.x, y: ev.y } };
  },
  move(originalInfo: IImageInfo, ev: PointerEvent) {
    if (originalInfo.moveActive) {
      ev.preventDefault();
      const { x, y } = originalInfo.moveActive;
      const movementX = ev.x - x;
      const movementY = ev.y - y;
      return {
        ...move(originalInfo, { x: movementX, y: movementY }),
        moveActive: { x: ev.x, y: ev.y },
      };
    }
    return originalInfo;
  },
  // up cancel out leave
  up(originalInfo: IImageInfo): IImageInfo {
    return { ...originalInfo, moveActive: undefined };
  },
};

type State = IImageInfo;
type Action =
  | { type: "initialize"; data: HTMLImageElement | IImageInfo | HTMLElement }
  | { type: "scale"; factor: number }
  | { type: "resize" | "zoom.inactive" }
  | { type: "reset"; initial: boolean }
  | { type: "wheel"; ev: WheelEvent }
  | {
      type: "gesture.start" | "gesture.change" | "gesture.end";
      ev: GestureEvent;
    }
  | { type: "pointer.down" | "pointer.move" | "pointer.up"; ev: PointerEvent };

const reducer = (prev: State, action: Action): State => {
  switch (action.type) {
    case "initialize":
      return initialize(action.data);
    case "scale":
      return scale(prev, action.factor);
    case "reset":
      return reset(prev, action.initial);
    case "resize":
      return resize(prev);
    case "zoom.inactive":
      return { ...prev, zoomActive: false };
    case "wheel":
      return wheel(prev, action.ev);
    case "gesture.start":
      return gesture.start(prev, action.ev);
    case "gesture.change":
      return gesture.change(prev, action.ev);
    case "gesture.end":
      return gesture.end(prev, action.ev);
    case "pointer.down":
      return pointer.down(prev, action.ev);
    case "pointer.move":
      return pointer.move(prev, action.ev);
    case "pointer.up":
      return pointer.up(prev);
    default:
      return prev;
  }
};

export const useImageViewerInfoReducer = () => {
  return React.useReducer(reducer, {
    naturalWidth: 0,
    naturalHeight: 0,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
};

type ImageViewerReducerType = [State, React.Dispatch<Action>];
type ImageViewerEventSetupEffectDeps = {
  active: boolean;
  modalRef: HTMLElement | null;
  imageViewRef: HTMLImageElement | HTMLElement | null;
};

export const useImageViewerSetupEffect = (
  reduce: ImageViewerReducerType,
  deps: ImageViewerEventSetupEffectDeps
) => {
  const [state, dispatch] = reduce;
  const { active, modalRef, imageViewRef } = deps;

  React.useEffect(() => {
    if (!active) return undefined;
    const handler = () => dispatch({ type: "resize" });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [active, dispatch, modalRef]);

  React.useEffect(() => {
    if (!modalRef) return undefined;
    const handler = (ev: WheelEvent) => dispatch({ type: "wheel", ev });
    modalRef.addEventListener("wheel", handler);
    return () => modalRef.removeEventListener("wheel", handler);
  }, [active, dispatch, modalRef]);

  React.useEffect(() => {
    // safari
    if (!modalRef || !("GestureEvent" in window)) return undefined;
    const down = (ev: GestureEvent) => dispatch({ type: "gesture.start", ev });
    const move = (ev: GestureEvent) => dispatch({ type: "gesture.change", ev });
    const up = (ev: GestureEvent) => dispatch({ type: "gesture.end", ev });
    modalRef.addEventListener("gesturestart", down);
    modalRef.addEventListener("gesturechange", move);
    modalRef.addEventListener("gestureend", up);
    return () => {
      modalRef.removeEventListener("gesturestart", down);
      modalRef.removeEventListener("gesturechange", move);
      modalRef.removeEventListener("gestureend", up);
    };
  }, [active, dispatch, modalRef]);

  React.useEffect(() => {
    if (!imageViewRef) return undefined;
    const down = (ev: any) => dispatch({ type: "pointer.down", ev });
    const move = (ev: any) => dispatch({ type: "pointer.move", ev });
    const up = (ev: any) => dispatch({ type: "pointer.up", ev });
    imageViewRef.addEventListener("pointerdown", down);
    imageViewRef.addEventListener("pointermove", move);
    imageViewRef.addEventListener("pointerup", up);
    imageViewRef.addEventListener("pointerleave", up);
    imageViewRef.addEventListener("pointerout", up);
    imageViewRef.addEventListener("pointercancel", up);
    return () => {
      imageViewRef.removeEventListener("pointerdown", down);
      imageViewRef.removeEventListener("pointermove", move);
      imageViewRef.removeEventListener("pointerup", up);
      imageViewRef.removeEventListener("pointerleave", up);
      imageViewRef.removeEventListener("pointerout", up);
      imageViewRef.removeEventListener("pointercancel", up);
    };
  }, [active, dispatch, imageViewRef]);

  const debouncedZoomInactive = React.useMemo(
    () => debounce(() => dispatch({ type: "zoom.inactive" }), 900),
    [dispatch]
  );

  React.useEffect(() => {
    if (state.zoomActive) {
      debouncedZoomInactive();
    }
  }, [debouncedZoomInactive, state.zoomActive]);
};

export default function useImageViewerSetup(
  config: ImageViewerEventSetupEffectDeps
) {
  const reduce = useImageViewerInfoReducer();
  useImageViewerSetupEffect(reduce, config);
  return reduce;
}
