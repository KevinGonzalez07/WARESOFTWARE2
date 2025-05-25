// product/funciones/funciones.ts
import prisma from "@/backend/prisma";
import { notFound } from "next/navigation";

export async function obtenerProducto(id: number) {
  const producto = await prisma.producto.findUnique({
    where: { id_producto: id },
    include: {
      proveedor: true,
      almacen: true,
    },
  });

  if (!producto) notFound();
  return producto;
}
