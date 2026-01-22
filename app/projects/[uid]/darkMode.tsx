export default function DarkMode({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`
        ${darkMode ? "bg-white text-black" : "bg-black text-white "}
        px-2 rounded-lg  sm:w-36 text-sm sm:text-base
        
    `}
    >
      {darkMode ? "Light mode" : "Dark mode"}
    </button>
  );
}
