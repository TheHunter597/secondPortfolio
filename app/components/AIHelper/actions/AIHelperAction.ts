"use server";
import type { Message } from "../AIHelper";
import stores from "./mini-store";
export async function AIHelperAction(
  state: { message: Message },
  formdata: FormData,
) {
  const text = formdata.get("message") as string;
  const userId = formdata.get("userId") as string;
  console.log({text,userId});
  
  console.log("slkjdflsdf");

  if (!text) {
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Sorry, I couldn't process your request. Please try again.",
      sender: "ai",
      timestamp: new Date(),
    };
    stores.pageReloadStore.set({ reloadPage: true });

    return { message: errorMessage };
  }

  try {
    const response = await fetch(
      "https://thehunter597.app.n8n.cloud/webhook-test/d140614e-e932-4679-8da6-122b4b8ccc6f",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text, id: userId }),
      },
    );

    if (response.status !== 200) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };

      stores.pageReloadStore.set({ reloadPage: true });

      return { message: errorMessage };
    }
    const data = await response.json();

    let messageText = "Thank you for your message!";

    if (data.response) {
      try {
        // The response field contains a JSON string, parse it
        const parsedResponse =
          typeof data.response === "string"
            ? JSON.parse(data.response)
            : data.response;
        messageText = parsedResponse;
      } catch (e) {
        // If parsing fails, use the response as is
        messageText = data.response;
      }
    } else if (data.message) {
      messageText = data.message;
    }

    // Add AI response
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: messageText,
      sender: "ai",
      timestamp: new Date(),
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    stores.pageReloadStore.set({ reloadPage: true });
    return {
      message: aiMessage,
    };
  } catch (error) {
    console.error("Error sending message:", error);
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Sorry, I couldn't process your request. Please try again.",
      sender: "ai",
      timestamp: new Date(),
    };
    stores.pageReloadStore.set({ reloadPage: true });
    return { message: errorMessage };
  }
}
