"use client";
import { useEffect, useState } from "react";
import InputsResult from "./InputsResult";
import Image from "next/image";
import EmailIcon from "@/public/images/ContactMeMainIcon.svg";
import { handleSubmit } from "./formSubmitServer";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
export default function ContactForm() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [sentCount, setSentCount] = useState<number>(0);
  useEffect(() => {
    setSentCount(
      localStorage.getItem("sentCount")
        ? parseInt(localStorage.getItem("sentCount")!)
        : 0
    );
  }, []);

  const updatedHandleSubmit = handleSubmit.bind(null, {
    name,
    email,
    message,
    sentCount,
  });
  const [state, handleSubmitUpdatedAgain] = useFormState(updatedHandleSubmit, {
    errors: {},
    message: "",
    messageSent: false,
  });

  return (
    <form action={handleSubmitUpdatedAgain}>
      <div className="ContactMe__MainContent">
        <legend>
          <Image src={EmailIcon} alt="contact me icon" width={80} height={80} />
          <span>Contact Me</span>
        </legend>
        <fieldset>
          <InputsResult
            email={email}
            setEmail={setEmail}
            message={message}
            setMessage={setMessage}
            name={name}
            setName={setName}
            errors={state.errors}
          />
        </fieldset>
      </div>
      {state.messageSent && (
        <p className="text-green-700 text-lg text-center font-semibold">
          Message Sent Successfully
        </p>
      )}
      {!state.messageSent ? (
        <small className="text-base font-semibold text-red-700 self-center">
          {state.message}
        </small>
      ) : (
        ""
      )}
      <SubmitButton />
    </form>
  );
}
