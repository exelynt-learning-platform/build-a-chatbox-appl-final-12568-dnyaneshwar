import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";

export const sendMessageToAPI = async (messages) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: messages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );

    // Validate response structure safely
    if (
      response &&
      response.data &&
      Array.isArray(response.data.choices) &&
      response.data.choices.length > 0 &&
      response.data.choices[0].message &&
      response.data.choices[0].message.content
    ) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    // Handle different error cases clearly
    if (error.response) {
      // API responded with error.
      throw new Error(
        error.response.data?.error?.message || "API Error occurred"
      );
    } else if (error.request) {
      // No response received
      throw new Error("No response from server. Check your network.");
    } else {
      // Other errors
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};