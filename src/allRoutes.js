// Auth Check
import RequireAuth from "./components/auth/RequireAuth";

// Pages
import AddQuestion from "./pages/AddQuestion";
import Home from "./pages/home";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Questions from "./pages/Questions";
import SingleQuestion from "./pages/SingleQuestion";

const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "questions", element: <Questions /> },
  {
    path: "add",
    element: (
      <RequireAuth>
        <AddQuestion />
      </RequireAuth>
    ),
  },
  {
    path: "question/:id",
    element: (
      <RequireAuth>
        <SingleQuestion />
      </RequireAuth>
    ),
  },
  {
    path: "profile",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: "leaderboard",
    element: <Leaderboard />,
  },
];

export default appRoutes;
