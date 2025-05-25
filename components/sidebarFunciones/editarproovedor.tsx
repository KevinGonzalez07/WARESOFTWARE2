// utils/editarProveedor.ts
export async function editarProveedor({
  selectedProveedor,
  productName,
  productDescription,
  imagen,
  pathname,
  setIsEditing,
}: {
  selectedProveedor: { id_proveedor: number };
  productName: string;
  productDescription: string;
  imagen: string;
  pathname: string;
  setIsEditing: (val: boolean) => void;
}) {
  try {
    const res = await fetch(`/api/proveedores/${selectedProveedor.id_proveedor}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: productName,
        direccion: productDescription,
        telefono: imagen,
      }),
    });

    if (!res.ok) throw new Error();

    const almacenId = Number(pathname.split('/').pop());
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: `Proveedor "${productName}" editado`,
        id_almacen: almacenId,
      }),
    });

    alert('Proveedor actualizado correctamente');
    setIsEditing(false);
  } catch {
    alert('Error al actualizar el proveedor');
  }
}
