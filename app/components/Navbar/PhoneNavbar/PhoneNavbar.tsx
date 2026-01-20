"use client";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavElements from "../DesktopNavbar/NavElements";

export default function PhoneNavbar() {
  const [active, setActive] = useState(false);
  return (
    <header className="block md:hidden py-2 w-full fixed top-0 z-50">
      <ul className="w-11/12 md:w-8/12 mx-auto flex flex-row justify-between relative z-50">
        <li>
          <Image
            src={"/images/logo-no-background.svg"}
            width={100}
            height={100}
            alt="logo"
          />
        </li>
        <HamburgerMenu active={active} setActive={setActive} />
        {
          <AnimatePresence>
            {active && (
              <motion.div
                className="flex flex-col gap-4 items-center absolute 
    rounded-md shadow-lg p-4 bg-white z-50 w-11/12 top-56 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NavElements setActive={setActive} />
              </motion.div>
            )}
          </AnimatePresence>
        }
      </ul>
    </header>
  );
}
