import Image from "next/image";
import NavElements from "./NavElements";

export default function DesktopNavbar() {
  return (
    <div className="lg:flex lg:flex-row lg:gap-8 lg:justify-center w-full hidden">
      <div>
        <Image
          src={"/images/logo-no-background.svg"}
          width={100}
          height={100}
          alt="logo"
        />
      </div>
      <NavElements />
    </div>
  );
}
