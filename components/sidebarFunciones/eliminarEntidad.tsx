type AlmacenIU = {
  id: number;
  name: string;
  color: number;
  productos: Producto[];
};

type Producto = {
  id_producto: number;
  nombre: string;
  id_almacen: number;
};

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
  selectedToDelete: AlmacenIU | null;
  selectedProducto: Producto | null;
  setIsDeleting: (val: boolean) => void;
  setPinCode: (val: string) => void;
}) {
  try {
    const id_usuario = localStorage.getItem("id_usuario");
    if (!id_usuario) {
      alert("No se encontró el ID del usuario");
      return;
    }

    const userRes = await fetch(`/api/usuarios/${id_usuario}`);
    if (!userRes.ok) throw new Error("Error al obtener el usuario");
    const user = await userRes.json();

    if (String(user.clave) !== pinCode) {
      alert("PIN incorrecto");
      return;
    }

    if (pathname === "/menu") {
      if (!selectedToDelete) {
        alert("Selecciona un almacén");
        return;
      }

      await fetch("/api/trash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descripcion: `Almacén "${selectedToDelete.name}" eliminado`,
          id_usuario: parseInt(id_usuario),
        }),
      });

      const res = await fetch(`/api/almacenes/${selectedToDelete.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar almacén");

      await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descripcion: `Almacén "${selectedToDelete.name}" eliminado`,
          id_almacen: selectedToDelete.id,
        }),
      });

      alert("Almacén eliminado correctamente");
    } else {
      if (!selectedProducto) {
        alert("Selecciona un producto");
        return;
      }

      const res = await fetch(`/api/productos/${selectedProducto.id_producto}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar producto");

      await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descripcion: `Producto "${selectedProducto.nombre}" eliminado`,
          id_almacen: selectedProducto.id_almacen,
        }),
      });

      alert("Producto eliminado correctamente");
    }

    setIsDeleting(false);
    setPinCode("");
  } catch (e) {
    console.error(e);
    alert(`Error al eliminar el ${pathname === "/menu" ? "almacén" : "producto"}`);
  }
}
