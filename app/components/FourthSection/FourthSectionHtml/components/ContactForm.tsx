"use client";
import { useEffect, useState } from "react";
import InputsResult from "./InputsResult";
import emailjs from "@emailjs/browser";
import { Audio, ColorRing } from "react-loader-spinner";
export default function ContactForm() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [sentCount, setSentCount] = useState<number>(0);
  useEffect(() => {
    setSentCount(
      localStorage.getItem("sentCount")
        ? parseInt(localStorage.getItem("sentCount")!)
        : 0
    );
  }, []);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (sentCount < 2) {
      setLoading(() => true);
      emailjs
        .send(
          "service_zsdb1sv",
          "template_d3df8yw",
          {
            to_name: "test",
            from_name: email,
            message: message,
          },
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          }
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            setMessageSent(true);
            setSentCount(sentCount + 1);
            localStorage.setItem("sentCount", sentCount.toString());
            setLoading(false);
          },
          (err) => {
            console.log("FAILED...", err);
            setLoading(false);
          }
        );
    } else {
      alert("You have already sent 3 messages. Please try again later.");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <legend>Send me a message</legend>
        <fieldset>
          <InputsResult
            email={email}
            setEmail={setEmail}
            message={message}
            setMessage={setMessage}
          />
        </fieldset>
      </div>
      {messageSent && (
        <p className="text-green-700 text-xl text-center">
          Message Sent Successfully
        </p>
      )}
      {loading ? (
        <ColorRing height={60} width={60} wrapperClass=" self-center" />
      ) : (
        <button
          type="submit"
          className="bg-green-500 text-white rounded-md p-2 w-1/2 mt-4"
        >
          Send
        </button>
      )}
    </form>
  );
}
