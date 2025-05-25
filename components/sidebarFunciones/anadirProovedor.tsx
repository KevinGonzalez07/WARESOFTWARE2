// utils/handleAddProveedor.ts
export const handleAddProveedor = async ({
  productName,
  productDescription,
  imagen,
  pathname,
  setShowModal,
  setProductName,
  setProductDescription,
  setImagen,
  setAddOption,
}: {
  productName: string;
  productDescription: string;
  imagen: string;
  pathname: string;
  setShowModal: (value: boolean) => void;
  setProductName: (value: string) => void;
  setProductDescription: (value: string) => void;
  setImagen: (value: string) => void;
  setAddOption: (value: string | null) => void;
}) => {
  try {
    const res = await fetch('/api/proveedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: productName,
        direccion: productDescription,
        telefono: imagen,
      }),
    });

    if (!res.ok) throw new Error('Error al crear proveedor');

    // Agregar log de proveedor
    const almacenId = Number(pathname.split('/').pop());
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: `Proveedor "${productName}" agregado`,
        id_almacen: almacenId,
      }),
    });

    alert('Proveedor guardado correctamente');

    setShowModal(false);
    setProductName('');
    setProductDescription('');
    setImagen('');
    setAddOption(null);
  } catch (err) {
    alert('Error al guardar el proveedor');
  }
};
