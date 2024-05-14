"use client";
import { useScroll, useTransform } from "framer-motion";
import { m } from "framer-motion";
import { useRef } from "react";

export default function ProjectSection({
  header,
  content,
}: {
  header: string;
  content: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.5 1", "1.33 1"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <m.div
      ref={ref}
      style={{
        scale: scale,
      }}
      className="ProjectSection"
    >
      <h4 className="ProjectSection__Header">{header}</h4>
      <p>{content}</p>
      <div className="ProjectSection__Info">
        <button>Visit website</button>
        <button>Git hup</button>
      </div>
    </m.div>
  );
}
