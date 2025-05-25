"use client";

import { useState } from "react";
import { WarehouseLogs } from "@/components/WarehouseLogs";
import { WarehouseTrash } from "@/components/WarehouseTrash";
import UserState from "@/components/UserState";
import SideBar from "@/components/Sidebar";
import { colorMap, useLogsData, useHandleLogout } from "./funciones/funciones";

export default function LogsPage() {
  const [logsData, setLogsData] = useState<any[]>([]);
  useLogsData(setLogsData);
  const handleLogout = useHandleLogout();

  return (
    <main className="flex h-screen bg-white">
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl text-black font-bold">Registro de Cambios</h1>
          <UserState />
        </header>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <WarehouseTrash />
  {logsData.map((almacen, index) => (
    <WarehouseLogs
      key={index}
      title={almacen.title}
      color={colorMap[almacen.color] || "gray"}
      logs={almacen.logs}
    />
  ))}
</div>


        <button
          onClick={handleLogout}
          className="bg-green-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Menu
        </button>
      </div>
    </main>
  );
}
