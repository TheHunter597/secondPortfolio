import { ReactNode } from "react";

export default function Bounded({ children }: { children: ReactNode }) {
  return <div className="w-11/12 mx-auto z-10">{children}</div>;
}
