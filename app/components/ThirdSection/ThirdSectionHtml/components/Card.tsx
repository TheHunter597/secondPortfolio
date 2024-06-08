import Image from "next/image";
import { useRef, useState } from "react";
import { KeyTextField } from "@prismicio/client";
import Link from "next/link";
export default function Card({
  data: { image, title, description, url, portfolioUrl, githubUrl },
  phoneView,
}: {
  data: {
    image: string | null | undefined;
    title: KeyTextField;
    description: string;
    url: string | null | undefined;
    portfolioUrl: string | null | undefined;
    githubUrl: string | null | undefined;
  };
  phoneView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
          src={image != null ? image : ""}
          alt="other1"
          quality={100}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: phoneView ? "40%" : "100%" }}
        />
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
            {url && <a href={url}>Visit Website</a>}
            {githubUrl && <Link href={githubUrl}>Github</Link>}
            {portfolioUrl && (
              <Link href={portfolioUrl} className="info">
                Project Info
              </Link>
            )}
          </div>
        </div>
        <p className="ThirdSectionCardText__Info">{description}</p>
      </div>
    </div>
  );
}
