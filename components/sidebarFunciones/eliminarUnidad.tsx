// utils/handleDeleteInit.ts
export async function handleDeleteInit({
  pathname,
  setAlmacenes,
  setProductos,
  setDeleteStep,
  setIsDeleting,
}: {
  pathname: string;
  setAlmacenes: (almacenes: any[]) => void;
  setProductos: (productos: any[]) => void;
  setDeleteStep: (step: number) => void;
  setIsDeleting: (value: boolean) => void;
}) {
  const id_usuario = localStorage.getItem("id_usuario");
  if (!id_usuario) {
    alert("No se encontró el ID del usuario");
    return;
  }

  try {
    if (pathname === "/menu") {
      const res = await fetch(`/api/almacenes?id_usuario=${id_usuario}`);
      if (!res.ok) throw new Error("Error al obtener almacenes");

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Datos de almacenes no válidos");

      setAlmacenes(data);
    } else {
      const almacenId = Number(pathname.split("/").pop());
      if (isNaN(almacenId)) {
        alert("ID de almacén inválido");
        return;
      }

      const res = await fetch(`/api/productos?id_almacen=${almacenId}`);
      if (!res.ok) throw new Error("Error al obtener productos");

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Datos de productos no válidos");

      setProductos(data);
    }

    setDeleteStep(1);
    setIsDeleting(true);
  } catch (error) {
    console.error("handleDeleteInit error:", error);
    alert("Ocurrió un error al iniciar la eliminación");
  }
}
