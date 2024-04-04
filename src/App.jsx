import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import RootLayout from "./layouts/RootLayout";
import Homepage from "./pages/homepage/Homepage";
import Profile from "./pages/profile/Profile";
import AuthLayout from "./layouts/AuthLayout";
import TopicSelection from "./pages/topicSelection/TopicSelection";
import Questions from "./pages/Questions";
import Topic from "./pages/topicSelection/Topic";
import QuestionDetail from "./pages/QuestionDetail";

function App() {
  const routes = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: "topics",
          element: <Questions />,
        },
        {
          path: "topic/:topicName",
          element: <Topic />,
        },
        {
          path: "question/:questionId",
          element: <QuestionDetail />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "topic-selection",
      element: (
        <PrivateRoute>
          <TopicSelection />
        </PrivateRoute>
      ),
    },
  ];

  const router = createBrowserRouter(routes);
  return (
    <>
      <>
        <Toaster position="top-right" />
        <AuthProvider>
          <RouterProvider router={router} />
          {/* <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/topic-selection" element={<TopicSelection />} />
            </Route>
          </Routes> */}
        </AuthProvider>
      </>
    </>
  );
}

export default App;
