import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Importación de páginas generales */
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

import HomeEstudiante from "./pages/Usuario/HomeEstudiante";
import HomeProfesor from "./pages/Usuario/HomeProfesor";
import HomeAdministrativo from "./pages/Administrador/HomeAdministrativo";


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

// Rutas para vehículos
import AddVehicle from "./pages/Vehiculo/AddVehicle";
import EditVehicle from "./pages/Vehiculo/EditVehicle";
import CodigoGenerado from "./pages/Acceso/CodigoGenerado";

import Estadisticas from "./pages/Estadisticas/Estadisticas";

import HomePolicia from "./pages/Policia/HomePolicia";

import EntradasSalidas from "./pages/Policia/EntradasSalidas";
import RegistrarEntrada from "./pages/Policia/RegistrarEntrada";
import RegistrarSalida from "./pages/Policia/RegistrarSalida";
import AsignarEspacioMoto from "./pages/Policia/AsignarEspacioMoto";


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

        {/* Ruta roles de usuarios */}
        <Route path="/home-estudiante" element={<HomeEstudiante />} />
        <Route path="/home-profesor" element={<HomeProfesor />} />
        <Route path="/home-administrativo" element={<HomeAdministrativo />} />

        {/*vehiculos*/}
        <Route path="/vehiculos/agregar" element={<AddVehicle />} />
        <Route path="/vehiculos/editar/:id" element={<EditVehicle />} />

        {/*Generar código*/}
        <Route path="/codigo-generado/:codigo" element={<CodigoGenerado />} />
        {/*Estadisticas*/}
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/home-policia" element={<HomePolicia />} />

        <Route path="/entradas-salidas" element={<EntradasSalidas />} />
        <Route path="/registrar-entrada" element={<RegistrarEntrada />} />
        <Route path="/registrar-salida" element={<RegistrarSalida />} />
        <Route path="/asignar-moto" element={<AsignarEspacioMoto />} />
        



      </Routes>
    </BrowserRouter>
  );
}
