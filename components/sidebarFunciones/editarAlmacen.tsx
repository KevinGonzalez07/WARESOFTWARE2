// utils/editarAlmacen.ts
export async function editarAlmacen({
  selectedAlmacen,
  name,
  description,
  selectedColor,
  colors,
  setIsEditing,
}: {
  selectedAlmacen: { id_almacen: number };
  name: string;
  description: string;
  selectedColor: string;
  colors: { name: string }[];
  setIsEditing: (val: boolean) => void;
}) {
  const colorIndex = colors.findIndex(c => c.name === selectedColor) + 1;

  try {
    if (!selectedAlmacen) return alert('Selecciona un almacén');

    const res = await fetch(`/api/almacenes/${selectedAlmacen.id_almacen}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: name,
        descripcion: description,
        color: colorIndex,
      }),
    });

    if (!res.ok) throw new Error();

    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: `Almacén "${name}" editado`,
        id_almacen: selectedAlmacen.id_almacen,
      }),
    });

    alert('Almacén actualizado');
    setIsEditing(false);
  } catch {
    alert('Error al guardar los cambios');
  }
}
