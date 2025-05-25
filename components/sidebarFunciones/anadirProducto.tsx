// utils/handleAddProducto.ts
export const handleAddProducto = async ({
  productName,
  productDescription,
  existencias,
  imagen,
  proveedorId,
  pathname,
  setShowModal,
  setProductName,
  setProductDescription,
  setExistencias,
  setImagen,
  setProveedorId,
  setAddOption,
}: {
  productName: string;
  productDescription: string;
  existencias: number;
  imagen: string;
  proveedorId: string;
  pathname: string;
  setShowModal: (value: boolean) => void;
  setProductName: (value: string) => void;
  setProductDescription: (value: string) => void;
  setExistencias: (value: number) => void;
  setImagen: (value: string) => void;
  setProveedorId: (value: string) => void;
  setAddOption: (value: string | null) => void;
}) => {
  const almacenId = Number(pathname.split('/').pop());
  try {
    const res = await fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: productName,
        descripcion: productDescription,
        existencia: existencias,
        imagen: imagen,
        id_almacen: almacenId,
        id_proveedor: parseInt(proveedorId),
      }),
    });

    if (!res.ok) throw new Error('Error al crear producto');

    // Agregar log
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: `Producto "${productName}" agregado`,
        id_almacen: almacenId,
      }),
    });

    setShowModal(false);
    setProductName('');
    setProductDescription('');
    setExistencias(0);
    setImagen('');
    setProveedorId('');
    setAddOption(null);
  } catch (err) {
    alert('Error al guardar el producto');
  }
};
