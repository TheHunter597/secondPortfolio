import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
export default function ContactMe() {
  return (
    <div className="ContactMe__wrapper">
      <div className="ContactMe">
        <form>
          <legend>Send me a message</legend>
          <fieldset>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="example@email.com" />
            </div>
            <div>
              <label htmlFor="email">Message</label>
              <textarea
                name="Enter your message"
                id=""
                cols={30}
                rows={3}
                placeholder="I love potatoes"
              ></textarea>
            </div>
          </fieldset>
          <button type="submit">Send</button>
        </form>
        <div className="ContactMe__Socials">
          <h4>
            <span>Or </span>
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
