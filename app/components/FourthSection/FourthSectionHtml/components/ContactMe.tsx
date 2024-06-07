import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import InputsResult from "./InputsResult";
import Link from "next/link";
import ContactForm from "./ContactForm";
export default function ContactMe() {
  return (
    <div className="w-11/12 lg:w-1/3 md:w-5/12 sm:w-6/12  bg-white shadow-lg rounded-md h-fit">
      <div className="ContactMe">
        <ContactForm />
        <div className="ContactMe__Socials">
          <h4>
            <span>OR </span>
          </h4>
          <div className="Socials__Content">
            <span>Contact me via :</span>
            <div className="Socials__Icons">
              <Link href={"https://wa.me/01229308595"} target="_blank">
                <FaWhatsapp />
              </Link>
              <Link href={"mailto:thehunter597777@gmail.com"} target="_blank">
                <BiLogoGmail />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
