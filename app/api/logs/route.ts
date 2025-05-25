import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

// POST /api/logs
export async function POST(req: NextRequest) {
  try {
    const { descripcion, id_almacen } = await req.json()

    if (!descripcion || !id_almacen) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 })
    }

    const newLog = await prisma.log.create({
      data: {
        descripcion,
        fecha: new Date(),
        id_almacen,
      },
    })

    return NextResponse.json(newLog)
  } catch (error) {
    console.error('Error creando log:', error)
    return NextResponse.json({ error: 'Error al crear log' }, { status: 500 })
  }
}

// GET /api/logs?id_almacen=1
export async function GET(req: NextRequest) {
  const id_almacen = parseInt(req.nextUrl.searchParams.get("id_almacen") || "", 10);
  const id_usuario = parseInt(req.nextUrl.searchParams.get("user") || "", 10);

  // Si se especifica id_almacen, retornar solo logs de ese almacén
  if (!isNaN(id_almacen)) {
    try {
      const logs = await prisma.log.findMany({
        where: {
          almacen: {
            id_almacen,
          },
        },
        orderBy: {
          fecha: "desc",
        },
      });

      return NextResponse.json(logs);
    } catch (error) {
      console.error("Error obteniendo logs:", error);
      return NextResponse.json({ error: "Error al obtener logs" }, { status: 500 });
    }
  }

  // Si se especifica user, retornar logs de todos sus almacenes
  if (!isNaN(id_usuario)) {
    try {
      const almacenes = await prisma.almacen.findMany({
        where: { id_usuario },
        include: { logs: true },
      });

      const result = almacenes.map((almacen) => {
        const groupedByDate: Record<string, { time: string; action: string }[]> = {};

        for (const log of almacen.logs) {
          const iso = log.fecha.toISOString();
          const date = iso.split("T")[0];
          const time = iso.split("T")[1].slice(0, 5);

          if (!groupedByDate[date]) groupedByDate[date] = [];
          groupedByDate[date].push({ time, action: log.descripcion });
        }

        const formattedLogs = Object.entries(groupedByDate).map(([date, entries]) => ({
          date,
          entries,
        }));

        return {
          title: almacen.nombre,
          color: almacen.color,
          logs: formattedLogs,
        };
      });

      return NextResponse.json(result);
    } catch (error) {
      console.error("Error obteniendo logs por usuario:", error);
      return NextResponse.json({ error: "Error al obtener logs por usuario" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Faltan parámetros de búsqueda" }, { status: 400 });
}

