// app/api/productos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/prisma';

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idStr = url.pathname.split('/').pop();
    const id_producto = parseInt(idStr || '', 10);

    if (isNaN(id_producto)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const body = await req.json();
    const { nombre, descripcion, existencia, imagen, id_proveedor } = body;

    if (
      typeof nombre !== 'string' || nombre.trim() === '' ||
      typeof descripcion !== 'string' || descripcion.trim() === '' ||
      typeof imagen !== 'string' || imagen.trim() === '' ||
      isNaN(Number(existencia)) ||
      isNaN(Number(id_proveedor))
    ) {
      return NextResponse.json({ error: 'Datos inválidos o incompletos' }, { status: 400 });
    }

    const updated = await prisma.producto.update({
      where: { id_producto },
      data: {
        nombre,
        descripcion,
        existencia: Number(existencia),
        imagen,
        id_proveedor: Number(id_proveedor),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idStr = url.pathname.split('/').pop();
    const id_producto = parseInt(idStr || '', 10);

    if (isNaN(id_producto)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await prisma.producto.delete({
      where: { id_producto },
    });

    return NextResponse.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}
