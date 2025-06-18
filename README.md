@@ -1,129 +1,12 @@

# Mexican Proyect

Este es un prototipo de sistema de estacionamiento hecho con **React + Vite**, estilizado con **TailwindCSS** y usando **Supabase** como backend.

---

## 📦 Requisitos

- Node.js >= 18
- Supabase account: https://supabase.com/

---

## ⚙️ Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/tuusuario/supabase-parking.git
cd supabase-parking
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Instala TailwindCSS (si no está):**

```bash
npm install -D tailwindcss postcss autoprefixer
```

4. **Crea los archivos de configuración:**

```bash
npx tailwindcss init -p
```

---

## 📁 Estructura de Carpetas

```txt
src/
├── App.jsx
├── main.jsx
├── index.css
└── pages/
    ├── Home.jsx
    ├── Acceso.jsx
    ├── Salida.jsx
    └── Historial.jsx
```

---

## 🎨 Configuración de TailwindCSS

Asegúrate de tener esto en `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Y en `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ▶️ Cómo correr el servidor

```bash
npm run dev
```

Abre el navegador en:

```
http://localhost:5173
```

---

## 🔗 Navegación en la App

- `/` → Página principal (Home)
- `/acceso` → Registrar entrada de auto
- `/salida` → Registrar salida de auto
- `/historial` → Ver historial

---

## 🚀 Próximos pasos

- Conectar Supabase con los formularios de Acceso y Salida.
- Mostrar historial desde la base de datos.
- Autenticación con Supabase (opcional).

---

## 🧪 Comandos Útiles

- **Limpiar instalación y reinstalar:**

```bash
rmdir /s /q node_modules
del /f /q package-lock.json
npm install
```

---

## 📄 Licencia

Este proyecto es un prototipo académico.
