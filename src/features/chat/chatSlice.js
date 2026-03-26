import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageToAPI } from "./chatAPI";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (userMessage, { getState, rejectWithValue }) => {
    try {
      
      const { chat } = getState();

      const updatedMessages = [
        ...chat.messages,
        { role: "user", content: userMessage },
      ];

      const aiResponse = await sendMessageToAPI(updatedMessages);

      return {
        userMessage,
        aiMessage: aiResponse,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        state.messages.push({
          role: "user",
          content: action.meta.arg,
        });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;

        // Add AI response
        state.messages.push({
          role: "assistant",
          content: action.payload.aiMessage,
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;