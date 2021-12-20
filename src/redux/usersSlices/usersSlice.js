import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query } from "firebase/firestore";
import { appFirestore } from "../../firebase.config";

const initialState = {
  users: [],
  isLoading: true,
};

// Thunk
export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  const collectionRef = collection(appFirestore, "users");
  const queryRef = query(collectionRef);
  const users = await getDocs(queryRef);
  let tempUsersList = users.docs.map((user) => {
    return { id: user.id, ...user.data() };
  });
  return tempUsersList;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    calcUsersScore: (state, action) => {
      let addedUsersToScore = action.payload.usersReducer.users.map((user) => {
        const userQuestions = action.payload.questionsReducer.questions.filter(
          (question) => question.user.uid == user.id
        );

        const userAnswers = Object.keys(
          action.payload.answersReducer.answers
        ).filter((answer) => answer.split("_")[0] == user.id);

        return { ...user, score: userQuestions.length + userAnswers.length };
      });

      state.users = addedUsersToScore;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.isLoading = true;
    },
  },
});

export const { calcUsersScore } = usersSlice.actions;
export default usersSlice.reducer;
