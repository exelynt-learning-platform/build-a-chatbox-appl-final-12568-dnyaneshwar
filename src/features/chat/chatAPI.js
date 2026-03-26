import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";

export const sendMessageToAPI = async (messages) => {
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

  return response.data.choices[0].message.content;
};