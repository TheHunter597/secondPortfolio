import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import InputsResult from "./InputsResult";
export default function ContactMe() {
  return (
    <div className="w-11/12 sm:w-5/12 bg-white shadow-lg rounded-md h-fit">
      <div className="ContactMe">
        <form>
          <div>
            <legend>Send me a message</legend>
            <fieldset>
              <InputsResult />
            </fieldset>
          </div>
          <button type="submit">Send</button>
        </form>
        <div className="ContactMe__Socials">
          <h4>
            <span>OR </span>
          </h4>
          <div className="Socials__Content">
            <span>Contact me via :</span>
            <div className="Socials__Icons">
              <FaFacebook />
              <FaWhatsapp />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
