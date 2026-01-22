import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import PhoneNavbar from "./PhoneNavbar/PhoneNavbar";

export default function Navbar() {
  return (
    <nav
      className="w-full p-4 px-16 text-lg font-bold z-20 fixed top-0 left-0
    text-white bg-opacity-0 flex flex-row gap-8 justify-center align-middle h-14
    "
    >
      <DesktopNavbar />
      <PhoneNavbar />
    </nav>
  );
}
