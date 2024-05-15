import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";
import MainContext from "@/app/context/context";
export default function Card({
  data: { image, title },
}: {
  data: {
    image: string;
    title: string;
  };
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const { functions } = useContext(MainContext);

  const spanVariants = {
    active: {
      y: -200,
      opacity: 1,
    },
    inactive: {
      y: 30,
      opacity: 0,
    },
  };
  return (
    <div
      className="ThirdSectionCard"
      ref={ref}
      onMouseEnter={(e) => {
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
      }}
    >
      <div
        className={`ThirdSectionCard__Image ${
          hovered
            ? "ThirdSectionCard__Image--active"
            : "ThirdSectionCard__Image--inactive"
        } relative`}
      >
        <Image
          src={image}
          alt="other1"
          quality={100}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
        />
        {/* <motion.span
          variants={spanVariants}
          animate={hovered ? "active" : "inactive"}
        >
          Visit Website
        </motion.span> */}
      </div>
      <div
        className={`ThirdSectionCard__Text ${
          hovered
            ? "ThirdSectionCard__Text--active"
            : "ThirdSectionCard__Text--inactive"
        }`}
      >
        <div className="ThirdSectionCardText__Headers">
          <h4>{title}</h4>
          <div className="ThirdSectionCardText__Buttons">
            <button>Git hup</button>
            <button>Visit website</button>
          </div>
        </div>
        <p className="ThirdSectionCardText__Info">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis modi
          deleniti rerum incidunt possimus voluptatem suscipit ullam, saepe
          nihil sit molestias fugit ab natus recusandae odio a libero pariatur
          quae.
        </p>
      </div>
    </div>
  );
}
