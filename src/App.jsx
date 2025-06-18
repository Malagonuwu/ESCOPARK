import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Importación de páginas generales */
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

/* Importación de páginas de usuario */
import Home from "./pages/Usuario/Home";
import Profile from "./pages/Usuario/Profile";
import EditProfile from "./pages/Usuario/EditProfile";
import Acceso from "./pages/Usuario/Acceso";
import Salida from "./pages/Usuario/Salida";
import Vehículos from "./pages/Usuario/Vehículos";

/* Importación de páginas de administrador */
import Estacionamientos from "./pages/Administrador/Estacionamientos";
import AddEstacionamiento from "./pages/Administrador/AddEstacionamiento";
import EditUsuario from "./pages/Administrador/EditUsuario";
import Guardias from "./pages/Administrador/Guardias";
import Usuarios from "./pages/Administrador/Usuarios";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas generales */}
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Rutas de usuario */}
        <Route path="/Profile" element={<Profile />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Acceso" element={<Acceso />} />
        <Route path="/Salida" element={<Salida />} />
        <Route path="/vehiculos" element={<Vehículos />} />

        {/* Rutas de administrador */}
        <Route path="/Estacionamientos" element={<Estacionamientos />} />
        <Route path="/AddEstacionamiento" element={<AddEstacionamiento />} />
        <Route path="/EditUsuario" element={<EditUsuario />} />
        <Route path="/Guardias" element={<Guardias />} />
        <Route path="/Usuarios" element={<Usuarios />} />

        {/* Ruta por defecto */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
