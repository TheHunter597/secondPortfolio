"use client";
import { useEffect, useState } from "react";
import InputsResult from "./InputsResult";
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
        : 0,
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
      <div className="contact-card__header">
        <h2>
          Let&apos;s <span>talk.</span>
        </h2>
        <p>Got a project or just want to say hi? I&apos;m all ears.</p>
      </div>
      <div className="contact-card__body">
        <fieldset className="contact-fieldset">
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
        {state.messageSent && (
          <p className="text-green-400 text-sm text-center font-semibold">
            Message sent! I&apos;ll get back to you soon 😊
          </p>
        )}
        {!state.messageSent && state.message && (
          <small className="text-sm font-semibold text-red-400 self-center">
            {state.message}
          </small>
        )}
        <SubmitButton />
      </div>
    </form>
  );
}
