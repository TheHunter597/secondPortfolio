import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
export default function Card() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const spanVariants = {
    active: {
      y: -100,
      opacity: 1,
    },
    inactive: {
      y: 30,
      opacity: 0,
    },
  };
  return (
    <motion.div className="ThirdSectionCard" ref={ref}>
      <div
        className={`ThirdSectionCard__Image ${
          hovered
            ? "ThirdSectionCard__Image--active"
            : "ThirdSectionCard__Image--inactive"
        } relative`}
        onMouseEnter={(e) => {
          setHovered(true);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
        }}
      >
        <Image
          src="/images/placeholder.png"
          alt="other1"
          width={800}
          height={500}
          quality={100}
        />
        <motion.span
          variants={spanVariants}
          animate={hovered ? "active" : "inactive"}
        >
          Visit Website
        </motion.span>
      </div>
      <div className="ThirdSectionCard__Text">
        <div className="ThirdSectionCardText__Headers">
          <h4>Mango first</h4>
          <div className="ThirdSectionCardText__Buttons">
            <button>Git hup</button>
          </div>
        </div>
        <p className="ThirdSectionCardText__Info">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis modi
          deleniti rerum incidunt possimus voluptatem suscipit ullam, saepe
          nihil sit molestias fugit ab natus recusandae odio a libero pariatur
          quae.
        </p>
      </div>
    </motion.div>
  );
}
