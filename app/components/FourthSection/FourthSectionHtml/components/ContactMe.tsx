import Link from "next/link";
import GmailIcon from "@/public/images/contact/Gmail.svg";
import WhatsappIcon from "@/public/images/contact/Whatsapp.svg";
import LinkedIn from "@/public/images/contact/Linkedin.svg";
import ContactForm from "./ContactForm";
import Image from "next/image";
export default function ContactMe() {
  const contacts = [
    {
      icon: WhatsappIcon,
      link: "https://wa.me/201229308595",
      alt: "Whatsapp",
    },
    {
      icon: GmailIcon,
      link: "mailto:thehunter597777@gmail.com",
      alt: "gmail",
    },
    {
      icon: LinkedIn,
      link: "https://www.linkedin.com/in/mohamed-hossam-3aaa8224b/",
      alt: "linkedin",
    },
  ];
  const result = contacts.map((contact) => {
    return (
      <Link href={contact.link} target="_blank" key={"ContactMe" + contact.alt}>
        <Image src={contact.icon} alt={contact.icon} width={30} height={30} />
      </Link>
    );
  });
  return (
    <div className="MainContactContainer">
      <div className="contact-card">
        <ContactForm />
        <div className="contact-card__socials">
          <span className="contact-reach-label">or reach me via</span>
          <div className="contact-divider-line" />
          <div className="Socials__Icons">{result}</div>
        </div>
      </div>
    </div>
  );
}
