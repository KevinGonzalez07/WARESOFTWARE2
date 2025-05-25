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
  if (!id_usuario) return alert("No se encontró el ID del usuario");

  try {
    if (pathname === "/menu") {
      const res = await fetch(`/api/almacenes?id_usuario=${id_usuario}`);
      const data = await res.json();
      if (!Array.isArray(data)) return alert("Error al cargar almacenes");
      setAlmacenes(data);
    } else {
      const almacenId = Number(pathname.split("/").pop());
      const res = await fetch(`/api/productos?id_almacen=${almacenId}`);
      const data = await res.json();
      if (!Array.isArray(data)) return alert("Error al cargar productos");
      setProductos(data);
    }

    setDeleteStep(1);
    setIsDeleting(true);
  } catch {
    alert("Ocurrió un error al iniciar la eliminación");
  }
}
