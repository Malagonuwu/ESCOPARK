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

// Ruta para obtener todos los usuarios
app.get("/api/get-users", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("usuarios")
      .select("*")

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error("Error inesperado:", error);
    res.status(500).json({ error: "Error inesperado" });
  }
});

//Ruta para obtener los datos de un solo usuario dado su id de usuario
app.get("/api/get-user/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario; // Obtiene el ID del parámetro de la URL

  if (!id_usuario) {
    return res.status(400).json({ error: "Falta o es inválido el id_usuario" });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("usuarios")
      .select("*")
      .eq("id_usuario", id_usuario) // Filtra por el id_usuario
      .single(); // Espera un solo resultado

    if (error) {
      // Si no se encuentra el usuario, Supabase puede retornar un error específico
      if (error.code === 'PGRST116') { // Código de error común de PostgREST para "no rows found"
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      console.error("Error al obtener usuario de Supabase:", error.message);
      return res.status(500).json({ error: "Error al obtener usuario: " + error.message });
    }

    // Aunque .single() ayuda, es buena práctica verificar si data es null/undefined
    if (!data) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error inesperado en /api/get-user/:id_usuario:", error);
    res.status(500).json({ error: "Error inesperado del servidor" });
  }
});

//Ruta para obtener los vehículos de un usuario dado su id de usuario
app.get("/api/get-user-vehicles/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario; // Obtiene el ID del parámetro de la URL

  if (!id_usuario) {
    return res.status(400).json({ error: "Falta o es inválido el id_usuario" });
  }

  try {
    // Asumiendo que tienes una tabla 'vehiculos' que tiene una columna 'id_usuario'
    // que enlaza con la tabla 'usuarios'.
    const { data, error } = await supabaseAdmin
      .from("vehiculos") // Nombre de tu tabla de vehículos
      .select("*") // Selecciona todas las columnas de la tabla de vehículos
      .eq("id_usuario", id_usuario) // Filtra por el id_usuario
  

    if (error) {
      console.error("Error al obtener vehículos de Supabase:", error.message);
      return res.status(500).json({ error: "Error al obtener vehículos: " + error.message });
    }

    // Si no hay vehículos, `data` será un array vacío, lo cual es correcto.
    res.json(data);
  } catch (error) {
    console.error("Error inesperado en /api/get-user-vehicles/:id_usuario:", error);
    res.status(500).json({ error: "Error inesperado del servidor" });
  }
});

//Ruta para guardar los cambios de un usuario dado su id
app.put("/api/update-user/:id_usuario", async (req, res) => {
  const { id_usuario } = req.params; // ID del usuario a actualizar desde la URL
  // Los datos a actualizar se reciben en el cuerpo de la solicitud (req.body)
  const { nombres, apellido_paterno, apellido_materno, correo_institucional } = req.body;

  // Puedes añadir validaciones para los campos recibidos en req.body
  if (!id_usuario) {
    return res.status(400).json({ error: "El ID de usuario es requerido para la actualización." });
  }

  // Objeto con los datos que se van a actualizar
  const updateData = {};
  if (nombres !== undefined) updateData.nombres = nombres;
  if (correo_institucional !== undefined) updateData.correo_institucional = correo_institucional;

  // Si no hay datos para actualizar, retorna un error
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "No se proporcionaron datos para actualizar." });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("usuarios")
      .update(updateData) // Objeto con los campos a actualizar
      .eq("id_usuario", id_usuario); // Filtra por el ID del usuario de la URL

    if (error) {
      console.error("Error al actualizar usuario en Supabase:", error.message);
      return res.status(500).json({ error: "Error al actualizar usuario: " + error.message });
    }
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error inesperado en /api/update-user/:id_usuario:", error);
    res.status(500).json({ error: "Error inesperado del servidor al actualizar usuario." });
  }
});

//Ruta para eliminar el vehiculo de un usuario dado el id del usuario y placas del vehiculo
app.delete("/api/delete-vehicle", async (req, res) => {
  const { id_usuario, placas } = req.body; // Obtiene el id_usuario y las placas del cuerpo de la solicitud

  if (!id_usuario || !placas) {
    return res.status(400).json({ error: "El ID de usuario y las placas del vehículo son requeridos para la eliminación." });
  }

  try {
    const { error } = await supabaseAdmin
      .from("vehiculos") // Tu tabla de vehículos
      .delete()
      .eq("id_usuario", id_usuario) // Filtra por el ID del usuario
      .eq("placas", placas);       // Y por las placas del vehículo

    if (error) {
      console.error("Error al eliminar vehículo en Supabase:", error.message);
      return res.status(500).json({ error: "Error al eliminar vehículo: " + error.message });
    }
    res.json({ message: "Vehículo eliminado correctamente." });
  } catch (error) {
    console.error("Error inesperado en /api/delete-vehicle:", error);
    res.status(500).json({ error: "Error inesperado del servidor al eliminar vehículo." });
  }
});

//Ruta para registrar un policia por medio del admin
app.post("/api/register-policia", async (req, res) => {
  const {
    name,
    paternalLastName,
    maternalLastName,
    correo, 
    idNumber, 
    password,
    tipo_usuario 
  } = req.body;
  console.log(req.body);

  // Validaciones básicas de entrada
  if (!name || !paternalLastName || !correo || !idNumber || !password || tipo_usuario !== "Policia") {

    return res.status(400).json({ error: "Faltan campos obligatorios o el tipo de usuario no es 'Policia'." ,message :req.body});
  }

  try {
    // 1. Registrar al usuario en la autenticación de Supabase
    // Usamos el correo electrónico para el registro de autenticación
    console.log("Intentando ingresar correo "+correo+" y contraseña "+password);
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email: correo,
      password: password,
       options: {
        data: {
          tipo_usuario: tipo_usuario 
        }
      }
    });

    console.log("data "+ JSON.stringify(authData, null, 2)+" error "+ JSON.stringify(authError, null, 2));
    if (authError) {
      console.error("Error en Supabase Auth signUp:", authError.message);
      // Puedes enviar mensajes de error más específicos si lo deseas (ej. "AuthApiError: Email already registered")
      return res.status(400).json({ error: authError.message });
    }

    // Obtener el ID del usuario recién creado en Supabase Auth
    const userId = authData.user.id;

    // 2. Insertar los detalles del perfil del policía en la tabla 'usuarios'
    const { data: userData, error: insertError } = await supabaseAdmin
      .from("usuarios") // Asegúrate de que este es el nombre correcto de tu tabla de usuarios
      .insert([
        {
          id_usuario: userId, // Enlaza con el ID de autenticación
          nombres: name,
          apellido_paterno: paternalLastName,
          apellido_materno: maternalLastName,
          correo_institucional: correo,
          tipo_usuario: tipo_usuario, 
         
        },
      ]);

    if (insertError) {
      console.error("Error al insertar en la tabla 'usuarios':", insertError.message);
      // Si falla la inserción en 'usuarios', considera eliminar el usuario de auth.users si no es lo que deseas.
      // Esto es un escenario de manejo de errores más avanzado.
      return res.status(500).json({ error: "Error al guardar los datos del policía: " + insertError.message });
    }

    res.status(201).json({ message: "Policía registrado exitosamente.", userId: userId });

  } catch (error) {
    console.error("Error inesperado en /api/register-policia:", error);
    res.status(500).json({ error: "Error inesperado del servidor al registrar policía." });
  }
});

//Ruta para registrar un nuevo estacionamiento
app.post("/api/crear-estacionamiento", async (req, res) => {
  const { Nombre, Tipo, Capacidad, Descripcion,Ubicacion } = req.body;

  // Validación básica
  if (!Nombre|| !Tipo || Capacidad==null || !Descripcion ||!Ubicacion ) {
    return res.status(400).json({ error: "Todos los campos son requeridos.",message:req.body });

  }

  try {
    const { data, error } = await supabaseAdmin
      .from("Estacionamiento") // Asegúrate de tener esta tabla creada
      .insert([
        {
          Nombre,
          Tipo,
          Capacidad,
          Descripcion,
          Ubicacion          
        },
      ]);

    if (error) {
      console.error("Error al crear estacionamiento:", error.message);
      return res.status(500).json({ error: "No se pudo crear el estacionamiento." });
    }

    res.status(201).json({ message: "Estacionamiento creado con éxito", data });
  } catch (err) {
    console.error("Error en /api/crear-estacionamiento:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

//Ruta para obtner los datos de los estacionamientos
app.get("/api/get-estacionamiento", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("Estacionamiento")
      .select("*")

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error("Error inesperado:", error);
    res.status(500).json({ error: "Error inesperado" });
  }
});