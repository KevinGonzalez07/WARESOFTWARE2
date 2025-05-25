export async function registrarUsuario(username: string, pin: string) {
  try {
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: username,
        clave: parseInt(pin),
        rol: false,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, usuario: data.usuario };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error al conectar con el servidor' };
  }
}
