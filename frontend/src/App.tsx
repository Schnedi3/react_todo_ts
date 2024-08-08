import "./css/app.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Tasks } from "./pages/Tasks";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./pages/ProtectedRoute";

export const App = () => {
  return (
    <BrowserRouter>
      <main className="app">
        <div className="header__image"></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};
