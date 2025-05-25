"use client";
import React, { useEffect, useState } from "react";

type TrashEntry = {
  time: string;
  action: string;
};

type TrashGroup = {
  date: string;
  entries: TrashEntry[];
};

export const WarehouseTrash = () => {
  const [logs, setLogs] = useState<TrashGroup[]>([]);

  useEffect(() => {
    const id_usuario = parseInt(localStorage.getItem("id_usuario") || "0", 10);
    if (!id_usuario) return;

    fetch(`/api/trash?user=${id_usuario}`)
      .then((res) => res.json())
      .then(setLogs)
      .catch(() => alert("Error al cargar WarehouseTrash"));
  }, []);

  if (logs.length === 0) return null;

  return (
    <div className="rounded-2xl p-4 w-120 text-white bg-gray-950">
      <div className="rounded-xl px-6 py-2 text-center mb-6">
        <h2 className="text-3xl font-bold font-lato">Almacenes Eliminados</h2>
      </div>
      <ul className="font-mono text-lg space-y-6">
        {logs.map((log, i) => (
          <li key={i}>
            <p className="font-bold mb-2">{log.date}</p>
            <ul className="space-y-1 ml-4">
              {log.entries.map((entry, j) => (
                <li key={j}>
                  {entry.time} - {entry.action}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
