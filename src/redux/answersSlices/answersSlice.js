import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query } from "firebase/firestore";
import { appFirestore } from "../../firebase.config";

const initialState = {
  answers: {},
  isLoaded: false,
};

export const getAllAnswers = createAsyncThunk("answer/getAll", async () => {
  const answersRef = collection(appFirestore, "answers");
  const answersQuery = query(answersRef);
  const answers = await getDocs(answersQuery);
  const answersObject = {};

  answers.docs.map((answer) => {
    answersObject[answer.id] = answer.data();
  });

  return answersObject;
});

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      state.answers[action.payload.id] = action.payload.content;
    },
  },

  extraReducers: {
    [getAllAnswers.pending]: (state, action) => {
      state.isLoaded = true;
    },
    [getAllAnswers.fulfilled]: (state, action) => {
      state.answers = action.payload;
      state.isLoaded = false;
    },
    [getAllAnswers.rejected]: (state, action) => {
      state.isLoaded = true;
    },
  },
});

export const { addAnswer } = answersSlice.actions;
export default answersSlice.reducer;
