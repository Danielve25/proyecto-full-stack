import {createRoot} from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router";
import Estructura_Inicio from "./pages/inicio/estructura_inicio";
import Estructura_Contacto from "./pages/contacto/Estructura_Contacto";
//import Estructura_Registro from './pages/registo/Estructura_Registro';
import Estructura_Productos from "./pages/productos/Estructura_Productos";
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Estructura_Inicio />} />
            <Route path="/contacto" element={<Estructura_Contacto />} />
            <Route path="/productos" element={<Estructura_Productos />} />
        </Routes>
    </BrowserRouter>
);
