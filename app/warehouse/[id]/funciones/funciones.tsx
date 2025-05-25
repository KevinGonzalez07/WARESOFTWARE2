// warehouse/funciones/getAlmacen.ts
import prisma from "@/backend/prisma";

export async function obtenerAlmacenConProductos(id: number) {
  return await prisma.almacen.findUnique({
    where: { id_almacen: id },
    include: {
      productos: {
        include: { proveedor: true },
      },
    },
  });
}
