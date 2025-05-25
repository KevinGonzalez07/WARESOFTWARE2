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
    if (!userRes.ok) throw new Error("Error al obtener usuario");
    const user = await userRes.json();

    if (String(user.clave) !== pinCode) {
      alert("PIN incorrecto");
      return;
    }

    if (pathname === '/menu') {
      if (!selectedToDelete?.id || !selectedToDelete?.nombre) {
        return alert("Selecciona un almacén válido");
      }

      const descripcion = `Almacén "${selectedToDelete.nombre}" eliminado`;

      const trashRes = await fetch('/api/trash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descripcion,
          id_usuario: parseInt(id_usuario),
        }),
      });
      if (!trashRes.ok) throw new Error("Error al registrar en trash");

      const deleteRes = await fetch(`/api/almacenes/${selectedToDelete.id}`, {
        method: 'DELETE',
      });
      if (!deleteRes.ok) throw new Error("Error al eliminar almacén");

      const logRes = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descripcion,
          id_almacen: selectedToDelete.id,
        }),
      });
      if (!logRes.ok) throw new Error("Error al registrar en logs");

      alert("Almacén eliminado correctamente");
    } else {
      if (!selectedProducto?.id_producto || !selectedProducto?.nombre) {
        return alert("Selecciona un producto válido");
      }

      const descripcion = `Producto "${selectedProducto.nombre}" eliminado`;

      const deleteRes = await fetch(`/api/productos/${selectedProducto.id_producto}`, {
        method: 'DELETE',
      });
      if (!deleteRes.ok) throw new Error("Error al eliminar producto");

      const logRes = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descripcion,
          id_almacen: selectedProducto.id_almacen,
        }),
      });
      if (!logRes.ok) throw new Error("Error al registrar en logs");

      alert("Producto eliminado correctamente");
    }

    setIsDeleting(false);
    setPinCode('');
  } catch (error) {
    console.error(error);
    alert(`Error al eliminar el ${pathname === '/menu' ? 'almacén' : 'producto'}`);
    setIsDeleting(false);
  }
}
