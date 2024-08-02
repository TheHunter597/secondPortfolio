"use server";

export async function handleSubmit(formData: any) {
  let { name, message, email, sentCount } = formData;

  const state = {
    errors: {} as { [key: string]: string },
    message: "",
    messageSent: false,
  };

  // Validation
  if (!email) state.errors.Email = "Email is required";
  if (!name) state.errors.Name = "Name is required";
  if (!message) state.errors.Message = "Message is required";

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email && !email.match(emailRegex))
    state.errors.Email = "Email is invalid";

  if (sentCount > 2) {
    state.message = "You have already sent 3 messages. Please try again later.";
    return state;
  }

  if (Object.keys(state.errors).length > 0) {
    state.message = "Error happened";
    return state;
  }
  await new Promise((resolve) => setTimeout(resolve, 1400));
  try {
    const environment = process.env.ENVIRONMENT || "development";
    const botChatId =
      environment === "production"
        ? process.env.BOT_CHAT_ID_PRODUCTION
        : process.env.BOT_CHAT_ID_PRODUCTION;

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: botChatId,
          text: `
          🎓 New Contact Form Submission! 🎓
          👤 Name: ${name}
          📧 Email: ${email}
          📝 Message: ${message}
          `,
        }),
      }
    );

    if (response.ok) {
      state.messageSent = true;
      state.message =
        "Message sent successfully, I will get back to you soon! 😊";
    } else {
      state.message = "Error happened while sending message ";
    }
  } catch (error) {
    console.log(error);
    state.message = "Error happened";
  }

  return state;
}
