// utils/handleEditInit.ts
export async function handleEditInit({
  pathname,
  setAlmacenes,
  setEditStep,
  setIsEditing,
}: {
  pathname: string;
  setAlmacenes: (almacenes: any[]) => void;
  setEditStep: (step: number) => void;
  setIsEditing: (value: boolean) => void;
}) {
  if (pathname === '/menu') {
    try {
      const id_usuario = localStorage.getItem("id_usuario");
      const res = await fetch(`/api/almacenes?id_usuario=${id_usuario}`);
      const data = await res.json();
      if (!Array.isArray(data)) return alert("Error al cargar almacenes");

      setAlmacenes(data);
      setEditStep(1);
      setIsEditing(true);
    } catch {
      alert("Error cargando almacenes");
    }
  } else {
    // Editar producto o proveedor
    setIsEditing(true);
    setEditStep(0);
  }
}
