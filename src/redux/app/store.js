import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "../authSlice/authSlice";
import questionsReducer from "../questionsSlices/questionSlice";
import answersReducer from "../answersSlices/answersSlice";
import usersReducer from "../usersSlices/usersSlice";
import notificationReducer from "../notificationSlices/notificationSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    questionsReducer,
    answersReducer,
    usersReducer,
    notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
