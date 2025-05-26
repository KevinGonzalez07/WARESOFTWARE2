export async function eliminarEntidad({
  pinCode,
  pathname,
  selectedToDelete,
  selectedProducto,
  setIsDeleting,
  setPinCode,
}: {
  pinCode: string;
  pathname: string;
  selectedToDelete: any;
  selectedProducto: any;
  setIsDeleting: (val: boolean) => void;
  setPinCode: (val: string) => void;
}) {
  try {
    const id_usuario = localStorage.getItem("id_usuario");
    if (!id_usuario) return alert("No se encontró el ID del usuario");

    const userRes = await fetch(`/api/usuarios/${id_usuario}`);
    const user = await userRes.json();

    if (String(user.clave) !== pinCode) {
      alert("PIN incorrecto");
      return;
    }

if (pathname === '/menu') {
  if (!selectedToDelete) return alert("Selecciona un almacén");

  await fetch('/api/trash', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      descripcion: `Almacén "${selectedToDelete.name}" eliminado`,
      id_usuario: parseInt(id_usuario),
    }),
  });

  const res = await fetch(`/api/almacenes/${selectedToDelete.id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error();

  await fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      descripcion: `Almacén "${selectedToDelete.name}" eliminado`,
      id_almacen: selectedToDelete.id,
    }),
  });

  alert("Almacén eliminado correctamente");
}
 else {
      if (!selectedProducto) return alert("Selecciona un producto");
      const res = await fetch(`/api/productos/${selectedProducto.id_producto}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();

      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descripcion: `Producto "${selectedProducto.nombre}" eliminado`,
          id_almacen: selectedProducto.id_almacen,
        }),
      });

      alert("Producto eliminado correctamente");
    }

    setIsDeleting(false);
    setPinCode('');
  } catch {
    alert(`Error al eliminar el ${pathname === '/menu' ? 'almacén' : 'producto'}`);
  }
}
