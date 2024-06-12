"use server";
import { SMTPClient } from "emailjs";
export async function handleSubmit(
  FormData: {
    email: string;
    message: string;
    name: string;
    sentCount: number;
  },
  state: {
    errors: { [key: string]: string };
    message: string;
    messageSent: boolean;
  }
) {
  let { name, message, email, sentCount } = FormData;
  state.errors = {};
  state.message = "";
  if (!email) {
    state.errors.Email = "Email is required";
  }
  if (!name) {
    state.errors.Name = "Name is required";
  }
  if (!message) {
    state.errors.Message = "Message is required";
  }
  if (Object.keys(state.errors).length != 0) {
    state.message = "Error happened";
  }
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(emailRegex)) {
    state.errors.Email = "Email is invalid";
  }
  if (sentCount > 2) {
    state.message = "You have already sent 3 messages. Please try again later.";
  }
  if (Object.keys(state.errors).length === 0) {
    const client = new SMTPClient({
      user: process.env.SMTP_USERNAME,
      password: process.env.SMTP_PASSWORD,
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT as string),
    });
    let done = false;
    client.send(
      {
        text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
        `,
        from: process.env.SMTP_USERNAME as string,
        to: "thehunter597777@gmail.com",
        subject: "Contact Form",
      },
      (err, message) => {
        if (err) {
          console.log(err);
          state.message = "Error happened";
          done = true;
        } else {
          state.messageSent = true;
          state.message = "Message sent successfully";
          done = true;
        }
      }
    );
    while (!done) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return state;
  }

  return state;
}
