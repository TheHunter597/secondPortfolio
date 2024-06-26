import { useEffect, useState } from "react";
import Input from "./Input";

export default function InputsResult({
  email,
  setEmail,
  message,
  setMessage,
  name,
  setName,
  errors,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  errors: { [key: string]: string };
}) {
  const [currentHovered, setCurrentHovered] = useState<string>("");
  const inputsNeeded = [
    {
      label: "Name",
      element: "input",
      type: "text",
      value: name,
      setValue: setName,
    },
    {
      label: "Email",
      element: "input",
      type: "email",
      value: email,
      setValue: setEmail,
    },
    {
      label: "Message",
      element: "textarea",
      type: "text",
      value: message,
      setValue: setMessage,
    },
  ];

  const result = inputsNeeded.map((input) => (
    <Input
      key={input.label}
      label={input.label}
      element={input.element}
      currentHovered={currentHovered}
      setCurrentHovered={setCurrentHovered}
      value={input.value}
      setValue={input.setValue}
      type={input.type}
      error={errors[input.label]}
    />
  ));
  return result;
}
