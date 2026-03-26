import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageToAPI } from "./chatAPI";

export const fetchAIResponse = createAsyncThunk(
  "chat/fetchAIResponse",
  async (messages, { rejectWithValue }) => {
    try {
      const response = await sendMessageToAPI(messages);
      return response;
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
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        role: "user",
        content: action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          role: "assistant",
          content: action.payload,
        });
      })
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;