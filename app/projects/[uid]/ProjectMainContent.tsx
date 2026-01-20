"use client";

import styles from "../Projects.module.scss";
import Image from "next/image";
import Link from "next/link";
import DarkMode from "./darkMode";
import { useState } from "react";
export default function ProjectMainContent({
  image,
  content,
}: {
  image: any;
  content: string;
}) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`${darkMode ? "bg-slate-900" : "bg-gray-50"} py-16 ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.Project}>
        <div className="absolute -top-14 text-lg py-2 font-medium w-full flex flex-row justify-between">
          <Link
            href={"/"}
            className="bg-red-400 p-2 rounded-lg text-white  text-sm sm:text-base"
          >
            Back to Main page
          </Link>
          <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <Image
          src={image ? image : ""}
          width={1200}
          height={1000}
          alt="project image"
          className="rounded-md"
        />
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className={styles.Project__Content}
        />
      </div>
    </div>
  );
}
