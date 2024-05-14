import Image from "next/image";
import NavElements from "./NavElements";

export default function Navbar() {
  return (
    <nav
      className="w-full bg-red-500 p-4 px-16 text-lg font-bold z-20 fixed top-0 left-0
    text-white bg-opacity-0 flex flex-row gap-8 justify-center align-middle h-14
    "
    >
      <div>
        <Image
          src={"/images/logo-no-background.svg"}
          width={100}
          height={100}
          alt="logo"
        />
      </div>
      <NavElements />
    </nav>
  );
}
