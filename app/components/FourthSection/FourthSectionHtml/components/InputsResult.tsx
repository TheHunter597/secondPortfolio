import { useEffect, useState } from "react";
import Input from "./Input";

export default function InputsResult() {
  const [currentHovered, setCurrentHovered] = useState<string>("");
  const inputsNeeded = [
    { label: "Email", element: "input", type: "email" },
    { label: "Message", element: "textarea", type: "text" },
  ];

  const result = inputsNeeded.map((input) => (
    <Input
      key={input.label}
      label={input.label}
      element={input.element}
      currentHovered={currentHovered}
      setCurrentHovered={setCurrentHovered}
      type={input.type}
    />
  ));
  return result;
}
