import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { NewsList } from "./components/NewsList";
import { AuthProvider } from "./contexts/AuthContext";
import { NotFoundLayout } from "./layouts";
import { HomeRoute, LoginRoute, NewsRoute, RegisterRoute } from "./routes";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
    children: [
      {
        path: "",
        element: <Navigate to={"/category/breaking"} />,
      },
      {
        path: "category/:slug",
        element: <NewsList />,
      },
    ],
  },
  { path: "/login", element: <LoginRoute /> },
  { path: "/register", element: <RegisterRoute /> },
  {
    path: "/news/:id",
    element: (
      <ProtectedRoute>
        <NewsRoute />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFoundLayout /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
