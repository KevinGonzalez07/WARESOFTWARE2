// register/funciones/registro.ts
import axios from "axios";

export async function registrarUsuario({
  nombre,
  correo,
  clave,
}: {
  nombre: string;
  correo: string;
  clave: number;
}) {
  const response = await axios.post("/api/usuarios", {
    nombre: nombre.trim(),
    correo: correo.trim(),
    clave,
    imagen: false,
  });

  const usuario = response.data;

  localStorage.setItem("nombre", usuario.nombre);
  localStorage.setItem("id_usuario", usuario.id_usuario);
  localStorage.setItem("imagen", usuario.imagen || "");

  return usuario;
}
