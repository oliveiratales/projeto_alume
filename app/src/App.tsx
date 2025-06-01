import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import { ColorModeProvider } from "./contexts/ColorModeProvider";

function RequireAuth() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <ColorModeProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ColorModeProvider>
  );
}
