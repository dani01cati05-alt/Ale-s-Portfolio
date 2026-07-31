import { useMemo } from "react";
import ShootingStar from "./ShootingStar.jsx";

const STAR_COUNT = 18;
const SIZE_RANGE = [16, 150];

function randomBetween([min, max]) {
  return min + Math.random() * (max - min);
}

export default function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        size: randomBetween(SIZE_RANGE),
      })),
    []
  );

  return (
    <>
      {stars.map((star) => (
        <ShootingStar key={star.id} size={star.size} />
      ))}
    </>
  );
}
