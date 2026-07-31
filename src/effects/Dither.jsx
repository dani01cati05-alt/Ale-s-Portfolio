import { forwardRef, useMemo } from "react";
import { DitherEffect } from "./DitherEffect.js";

const Dither = forwardRef(function Dither(props, ref) {
  const effect = useMemo(() => new DitherEffect(props), []); // eslint-disable-line react-hooks/exhaustive-deps
  return <primitive ref={ref} object={effect} dispose={null} />;
});

export default Dither;
