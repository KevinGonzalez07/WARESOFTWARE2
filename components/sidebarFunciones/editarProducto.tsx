// utils/editarProducto.ts
export async function editarProducto({
  selectedProducto,
  productName,
  productDescription,
  existencias,
  imagen,
  proveedorId,
  setIsEditing,
}: {
  selectedProducto: { id_producto: number; id_almacen: number };
  productName: string;
  productDescription: string;
  existencias: number;
  imagen: string;
  proveedorId: string;
  setIsEditing: (val: boolean) => void;
}) {
  try {
    const res = await fetch(`/api/productos/${selectedProducto.id_producto}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: productName,
        descripcion: productDescription,
        existencia: existencias,
        imagen,
        id_proveedor: parseInt(proveedorId),
      }),
    });

    if (!res.ok) throw new Error();

    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: `Producto "${productName}" editado`,
        id_almacen: selectedProducto.id_almacen,
      }),
    });

    alert('Producto actualizado correctamente');
    setIsEditing(false);
  } catch {
    alert('Error al actualizar el producto');
  }
}
