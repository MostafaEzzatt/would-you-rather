import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { appFirestore } from "../../firebase.config";

const initialState = {
  questions: [],
  allQuestions: [],
  size: 0,
  isLoading: true,
};
// Thunk

export const asyncGetAllQuestions = createAsyncThunk(
  "questions/getAllQuestions",
  async (payload, { getState }) => {
    const questionsRef = collection(appFirestore, "questions");
    const questionsQuery = query(questionsRef);
    const questionsRequest = await getDocs(questionsQuery);
    let finalQuestionList = questionsRequest.docs.map((question) => {
      const questionObject = {
        id: question.id,
        optionOne: question.data().optionOne,
        optionTwo: question.data().optionTwo,
        user: question.data().user.id,
      };
      return questionObject;
    });

    return finalQuestionList;
  }
);

export const asyncGetQuestionUser = createAsyncThunk(
  "questions/getQuestionUser",
  async (payload, { getState }) => {
    const questions = getState().questionsReducer.questions;

    let tempQuestionsList = [];

    for (const key in questions) {
      if (Object.hasOwnProperty.call(questions, key)) {
        const authRef = doc(appFirestore, "users", questions[key].user);
        const tempUser = await getDoc(authRef);
        tempQuestionsList.push({
          ...questions[key],
          user: { uid: questions[key].user, ...tempUser.data() },
        });
      }
    }

    return tempQuestionsList;
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestions: (state, action) => {
      state.questions.push(action.payload);
      state.size++;
    },
    addAllQuestions: (state, action) => {
      state.questions = action.payload.questions;
      state.size = action.payload.size;
      state.isLoading = true;
    },
    filterUnAnswered: (state, action) => {
      const unAsnwered = state.allQuestions.filter(
        (question) => !action.payload.includes(question.id)
      );

      state.questions = unAsnwered;
    },
    filterAnswered: (state, action) => {
      const Asnwered = state.allQuestions.filter((question) =>
        action.payload.includes(question.id)
      );

      state.questions = Asnwered;
    },
    filterAll: (state, action) => {
      state.questions = state.allQuestions;
    },
    clearQuestions: (state) => {
      state.questions = [];
      state.size = 0;
    },
    doneLoading: (state, action) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [asyncGetAllQuestions.pending]: (state, action) => {
      state.isLoading = true;
    },
    [asyncGetAllQuestions.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.allQuestions = action.payload;
      state.isLoading = false;
    },
    [asyncGetAllQuestions.rejected]: (state, action) => {
      state.isLoading = true;
    },
    // Get Questions User
    [asyncGetQuestionUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [asyncGetQuestionUser.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.allQuestions = action.payload;
      state.isLoading = false;
    },
    [asyncGetQuestionUser.rejected]: (state, action) => {
      state.isLoading = true;
    },
  },
});

export default questionsSlice.reducer;
export const {
  addQuestions,
  clearQuestions,
  doneLoading,
  addAllQuestions,
  filterUnAnswered,
  filterAnswered,
  filterAll,
} = questionsSlice.actions;
