import { createSlice } from "@reduxjs/toolkit";

// Helper
import { uuid } from "../../shared/helpers";

// Message Mods Mods
// error
// info
// success
// warning
// full message Example : { id: uuid(), message: "Your Question Added :)", mode: "success" },

const initialState = {
  messages: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.messages.push({ ...action.payload, id: uuid() });
    },
    removeNotification: (state, action) => {
      let newState = state.messages.filter((_t) => _t.id !== action.payload);
      state.messages = newState;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
