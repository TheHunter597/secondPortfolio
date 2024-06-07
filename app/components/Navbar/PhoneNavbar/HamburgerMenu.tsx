import "./HamburgerMenu.scss";
export default function HamburgerMenu({
  active,
  setActive,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`hamburger ${active ? "hamburger--active" : ""}`}
      style={{ rotate: "180deg" }}
      onClick={() => {
        setActive((prev) => !prev);
      }}
    >
      <li className="line"></li>
      <li className="line"></li>
      <li className="line"></li>
    </div>
  );
}
