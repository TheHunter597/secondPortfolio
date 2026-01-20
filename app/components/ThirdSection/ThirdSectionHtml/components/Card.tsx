import Image from "next/image";
import { useRef, useState } from "react";
import { KeyTextField } from "@prismicio/client";
import Link from "next/link";

function SorryCard({
  setShowSorry,
  portfolioUrl,
}: {
  setShowSorry: React.Dispatch<React.SetStateAction<boolean>>;
  portfolioUrl?: string | null | undefined;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-neutral-950/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white shadow-2xl ring-1 ring-white/10">
        <div
          className="pointer-events-none absolute inset-x-8 -top-24 h-48 bg-gradient-to-r from-red-400/30 via-orange-400/30 to-amber-400/30 blur-3xl"
          aria-hidden
        />

        <div className="flex items-start justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
              <span aria-hidden className="text-xl">
                ⚠️
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                Heads up
              </p>
              <h1 className="text-xl font-semibold sm:text-2xl">
                This deployment is paused
              </h1>
            </div>
          </div>

          <button
            aria-label="Close"
            onClick={() => setShowSorry(false)}
            className="rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 px-6 pb-6 sm:px-8 sm:pb-8">
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            The website is currently offline, as hosting it on a Kubernetes
            cluster with multiple containers on Azure is quite costly. If you’d
            like to see a working version, I’d be happy to provide the
            development version along with instructions on how to run it. Just
            reach out to me, and I’ll send it over.
          </p>
          <div className="space-y-3">
            <p className="text-sm font-medium text-white/80 sm:text-base">
              You can still review the project highlights here:
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {portfolioUrl && (
                <Link
                  href={portfolioUrl}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70"
                >
                  View project info
                </Link>
              )}
              <button
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70"
                onClick={() => setShowSorry(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [isECom, setIsECom] = useState(title === "Microservices E-commerce");
  const [showSorry, setShowSorry] = useState(false);
  return (
    <div className="relative">
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
              {url && (
                <a
                  href={url}
                  target="_blank"
                  onClick={(e) => {
                    if (isECom) {
                      e.preventDefault();
                      setShowSorry(true);
                    }
                  }}
                >
                  Visit Website
                </a>
              )}
              {githubUrl && (
                <Link href={githubUrl} target="_blank">
                  Github
                </Link>
              )}
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
      {showSorry && isECom && (
        <SorryCard setShowSorry={setShowSorry} portfolioUrl={portfolioUrl} />
      )}
    </div>
  );
}
