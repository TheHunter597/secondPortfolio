"use client";
import { ReactLenis, useLenis } from "lenis/react";

export default function LenisWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });
  return <ReactLenis root>{children}</ReactLenis>;
}
