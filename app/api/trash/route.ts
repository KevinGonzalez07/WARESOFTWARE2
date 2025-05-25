import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/prisma';

export async function POST(req: NextRequest) {
  try {
    const { descripcion, id_usuario } = await req.json();

    if (!descripcion || !id_usuario) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const trashEntry = await prisma.trash.create({
      data: {
        descripcion,
        fecha: new Date(),
        id_usuario,
      },
    });

    return NextResponse.json(trashEntry);
  } catch (error) {
    console.error("Error al registrar en trash:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const id_usuario = parseInt(req.nextUrl.searchParams.get("user") || "", 10);
  if (isNaN(id_usuario)) {
    return NextResponse.json({ error: "Usuario inválido" }, { status: 400 });
  }

  const trash = await prisma.trash.findMany({
    where: { id_usuario },
    orderBy: { fecha: "desc" },
  });

  const grouped = trash.reduce((acc: Record<string, { time: string; action: string }[]>, entry) => {
    const date = entry.fecha.toISOString().split("T")[0];
    const time = entry.fecha.toISOString().split("T")[1].slice(0, 5);
    if (!acc[date]) acc[date] = [];
    acc[date].push({ time, action: entry.descripcion });
    return acc;
  }, {});

  const result = Object.entries(grouped).map(([date, entries]) => ({ date, entries }));
  return NextResponse.json(result);
}
