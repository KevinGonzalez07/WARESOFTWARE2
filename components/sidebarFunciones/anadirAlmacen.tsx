// utils/handleAddAlmacen.ts
export const handleAddAlmacen = async ({
  name,
  description,
  selectedColor,
  colors,  // Añadir colors aquí
  setShowModal,
  setName,
  setDescription,
  setSelectedColor,
}: {
  name: string;
  description: string;
  selectedColor: string;
  colors: { name: string }[]; // Tipo de datos esperado para colors
  setShowModal: (value: boolean) => void;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
  setSelectedColor: (value: string) => void;
}) => {
  const colorIndex = colors.findIndex(c => c.name === selectedColor) + 1;
  if (!name || !description || !selectedColor) return alert('Todos los campos son obligatorios');

  try {
    const id_usuario = localStorage.getItem("id_usuario");
    const res = await fetch('/api/almacenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: name,
        descripcion: description,
        color: colorIndex,
        id_usuario: Number(id_usuario),
      }),
    });

    if (!res.ok) throw new Error('Error al crear almacén');

    const nuevoAlmacen = await res.json();

    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: `Almacén "${name}" creado`,
        id_almacen: nuevoAlmacen.id_almacen,
      }),
    });

    setShowModal(false);
    setName('');
    setDescription('');
    setSelectedColor('');
  } catch (err) {
    alert('Error al guardar el almacén');
  }
};



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
