"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const svgFiles = [
  "/images/shape-119.svg",
  "/images/shape-89.svg",
  "/images/shape-91.svg",
  "/images/shape-93.svg",
];

const AnimatedBackground = () => {
  const [shapes, setShapes] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      scale: number;
      rotation: number;
      file: string;
    }>
  >([]);

  useEffect(() => {
    // Generate random positions and properties for shapes
    const newShapes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360,
      file: svgFiles[Math.floor(Math.random() * svgFiles.length)],
    }));
    setShapes(newShapes);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute transition-all duration-10000 ease-in-out"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `scale(${shape.scale}) rotate(${shape.rotation}deg)`,
            animation: `float ${10 + Math.random() * 10}s infinite ease-in-out`,
            width: "200px",
            height: "200px",
          }}
        >
          <Image
            src={shape.file}
            alt="Background shape"
            className="w-full h-full opacity-20"
            width={200}
            height={200}
          />
        </div>
      ))}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) scale(${shapes[0]?.scale || 1})
              rotate(${shapes[0]?.rotation || 0}deg);
          }
          25% {
            transform: translate(10px, -10px) scale(${shapes[0]?.scale || 1})
              rotate(${shapes[0]?.rotation || 0}deg);
          }
          50% {
            transform: translate(0, 0) scale(${shapes[0]?.scale || 1})
              rotate(${shapes[0]?.rotation || 0}deg);
          }
          75% {
            transform: translate(-10px, 10px) scale(${shapes[0]?.scale || 1})
              rotate(${shapes[0]?.rotation || 0}deg);
          }
          100% {
            transform: translate(0, 0) scale(${shapes[0]?.scale || 1})
              rotate(${shapes[0]?.rotation || 0}deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
