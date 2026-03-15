"use server";

interface SendMessageInput {
  text: string;
  userId: string | null;
}

interface SendMessageResult {
  ok: boolean;
  message: string;
}

export async function sendMessageAction({
  text,
  userId,
}: SendMessageInput): Promise<SendMessageResult> {
  const webhookUrl = process.env.N8N_WEBHOOK_LINK;

  if (!text.trim()) {
    return {
      ok: false,
      message: "Sorry, I couldn't process your request. Please try again.",
    };
  }

  if (!webhookUrl) {
    console.error("Missing N8N_WEBHOOK_LINK environment variable");
    return {
      ok: false,
      message: "Sorry, I couldn't process your request. Please try again.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text, id: userId }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("n8n webhook request failed", {
        status: response.status,
        statusText: response.statusText,
      });

      return {
        ok: false,
        message: "Sorry, I couldn't process your request. Please try again.",
      };
    }

    const data = await response.json();

    let messageText = "Thank you for your message!";

    if (data.response) {
      try {
        const parsedResponse =
          typeof data.response === "string"
            ? JSON.parse(data.response)
            : data.response;
        messageText =
          typeof parsedResponse === "string"
            ? parsedResponse
            : JSON.stringify(parsedResponse);
      } catch {
        messageText = data.response;
      }
    } else if (data.message) {
      messageText = data.message;
    }

    return {
      ok: true,
      message: messageText.replace(/\\n/g, "\n"),
    };
  } catch (error) {
    console.error("Error sending message to n8n:", error);
    return {
      ok: false,
      message: "Sorry, I couldn't process your request. Please try again.",
    };
  }
}
