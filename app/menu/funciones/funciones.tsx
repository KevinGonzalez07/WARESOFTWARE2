// menu/funciones/funciones.ts
"use client";

import { useEffect } from "react";

export const colorMap = [
  'rgb(93, 120, 219)',     // 1 Blue
  'rgb(235, 71, 71)',      // 2 Red
  'rgb(255, 204, 0)',      // 3 Yellow
  'rgb(153, 102, 51)',     // 4 Brown
  'rgb(0, 204, 255)',      // 5 Aqua
  'rgb(40, 167, 69)',      // 6 Green
  'rgb(255, 145, 68)',     // 7 Orange
  'rgb(111, 66, 193)',     // 8 Purple
  'rgb(255, 99, 132)',     // 9 Pink
  'rgb(108, 117, 125)',    // 10 Gray
];

export const useUserAndAlmacenes = (
  setUserId: (id: number) => void,
  setAlmacenes: (data: any[]) => void
) => {
  useEffect(() => {
    const id = parseInt(localStorage.getItem("id_usuario") || "0", 10);
    if (!id) {
      window.location.href = "/login";
    } else {
      setUserId(id);
      fetchAlmacenes(id, setAlmacenes);
    }
  }, []);
};

const fetchAlmacenes = async (id: number, setAlmacenes: (data: any[]) => void) => {
  try {
    const res = await fetch(`/api/almacenes?id_usuario=${id}`);
    const data = await res.json();
    setAlmacenes(data);
  } catch (error) {
    console.error("Error al obtener almacenes:", error);
  }
};
