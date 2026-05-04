"use client";

import Lottie from "lottie-react";


const sunAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 200,
  h: 200,
  nm: "Sun",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Sun Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 0, s: [0] },
            { t: 90, s: [360] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "el",
          s: { a: 0, k: [80, 80] },
          p: { a: 0, k: [0, 0] },
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.98, 0.565, 0.035, 1] },
          o: { a: 0, k: 100 },
          r: 1,
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
    },
  ],
};

export default function LottieAnimation({ className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={sunAnimation}
        loop={true}
        style={{ width: 120, height: 120, filter: "drop-shadow(0 0 20px rgba(251,191,36,0.5))" }}
      />
    </div>
  );
}