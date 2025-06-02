import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ColorModeProvider } from "./contexts/ColorModeProvider";

// Rotas
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import MyProfile from "./pages/profile/MyProfile";
import SimulationHistory from "./pages/simulation/SimulationHistory";
import CreateSimulation from "./pages/simulation/CreateSimulation";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/history" element={<SimulationHistory />} />
              <Route path="/create" element={<CreateSimulation />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ColorModeProvider>
  );
}
