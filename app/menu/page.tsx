"use client";

import { useState } from "react";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import UserState from "@/components/UserState";
import { WarehouseCard } from "@/components/WarehouseCard";
import { Space_Mono } from "next/font/google";
import { colorMap, useUserAndAlmacenes } from "./funciones/funciones";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Menu() {
  const [userId, setUserId] = useState<number | null>(null);
  const [almacenes, setAlmacenes] = useState<any[]>([]);

  useUserAndAlmacenes(setUserId, setAlmacenes);

  if (!userId) return null; // Espera a tener el userId

  return (
    <>
      <Head>
        <title>WareSoftware</title>
      </Head>
      <main className="flex h-screen">
        <div className="flex-1 bg-white">
          <header className="flex justify-between items-center bg-gray-100 p-4">
            <h1
              className={spaceMono.className}
              style={{
                color: "black",
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              &gt;WareSoftWare
            </h1>
            <UserState />
          </header>

          <div>
            <Sidebar />
            <section
              className="rounded-3xl m-6 p-6 pl-10"
              style={{ marginLeft: "120px" }}
            >
              <h2
                className="text-3xl font-bold font-lato bg-gray-300 rounded-full px-4 py-1 inline-block mb-4"
                style={{ color: "black", fontSize: 30 }}
              >
                Warehouses
              </h2>

              <div className="flex gap-4 flex-wrap">
                {almacenes.map((almacen, i) => (
                  <WarehouseCard
                    key={almacen.id}
                    id={almacen.id}
                    title={almacen.name}
                    color={colorMap[almacen.color - 1] || 'gray'}
                    items={almacen.productos || []}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
