import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Cliente Supabase admin con service role key
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Ruta para eliminar usuario
app.delete("/api/delete-user/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario; // UUID string

  if (!id_usuario) {
    return res.status(400).json({ error: "Falta o es inválido el id_usuario" });
  }

  try {
    // 1. Eliminar primero de la tabla personalizada Usuarios
    const { error: dbError } = await supabaseAdmin
      .from("usuarios")
      .delete()
      .eq("id_usuario", id_usuario);

    if (dbError) {
      return res.status(400).json({
        error: "Error al eliminar en tabla Usuarios: " + dbError.message,
      });
    }

    // 2. Eliminar del sistema de autenticación de Supabase (auth.users)
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id_usuario);

    if (authError) {
      return res.status(400).json({
        error: "Error al eliminar en Auth: " + authError.message,
      });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error inesperado:", error);
    res.status(500).json({ error: "Error inesperado" });
  }
});

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
