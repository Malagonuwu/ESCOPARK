# Frontend - Proyecto Supabase Parking

Este proyecto está creado con **React** y **Vite**, y utiliza **React Router** para manejar las rutas de la aplicación.

## Estructura general de carpetas y archivos importantes
src/
├── assets/ # Imágenes, logos y recursos estáticos
├── components/ # Componentes reutilizables (botones, cards, etc.)
├── pages/ # Páginas principales que se mapean a rutas
│ ├── Home.jsx
│ ├── Acceso.jsx
│ ├── Salida.jsx
│ ├── Historial.jsx
│ └── Alumno.jsx
├── App.jsx # Configuración de rutas principal
├── main.jsx # Punto de entrada de la aplicación
└── index.css # Estilos globales


## Qué archivos modificar
- **`src/App.jsx`**: Aquí se definen las rutas principales con React Router. Para agregar nuevas páginas, importa el componente y añade una nueva ruta `<Route path="..." element={<NuevoComponente />} />`.
- **`src/pages/`**: Cada archivo `.jsx` aquí representa una página de la aplicación. Modifica estas páginas para cambiar el contenido o crea nuevas páginas aquí para nuevas rutas.
- **`src/components/`**: Carpeta recomendada para componentes UI reutilizables (botones, formularios, tarjetas, etc.).
- **`src/main.jsx`**: Archivo de configuración inicial (generalmente no necesita cambios).
- **`src/index.css`**: Archivo para estilos globales y configuración de Tailwind CSS.

## Cómo crear nuevas páginas o componentes
### Crear una nueva página
1. En `src/pages/`, crea un nuevo archivo (ej. `Nuevo.jsx`)
2. Crea el componente:
```jsx
export default function Nuevo() {
  return <h1>Esta es la nueva página</h1>;
}
```

## En App.jsx, añade la ruta:

import Nuevo from './pages/Nuevo';
<Route path="/nuevo" element={<Nuevo />} />

## Crear un componente reutilizable
En src/components/, crea un archivo (ej. Boton.jsx)
Define el componente:
export default function Boton({ onClick, children }) {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}


## ¿Cómo iniciar el proyecto?
1. npm install
2. npm run dev
3. Abre el navegador en http://localhost:5173

