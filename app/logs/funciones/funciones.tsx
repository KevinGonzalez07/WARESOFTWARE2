// logs/funciones/funciones.ts
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const colorMap = [
  "", "rgb(93, 120, 219)", "rgb(235, 71, 71)", "rgb(255, 204, 0)",
  "rgb(153, 102, 51)", "rgb(0, 204, 255)", "rgb(40, 167, 69)",
  "rgb(255, 145, 68)", "rgb(111, 66, 193)", "rgb(255, 99, 132)", "rgb(108, 117, 125)"
];

export const useLogsData = (setLogsData: (data: any[]) => void) => {
  useEffect(() => {
    const id_usuario = parseInt(localStorage.getItem("id_usuario") || "0", 10);
    if (!id_usuario) {
      window.location.href = "/login";
      return;
    }

    fetch(`/api/logs?user=${id_usuario}`)
      .then(res => res.json())
      .then(setLogsData)
      .catch(() => alert("Error al cargar logs"));
  }, []);
};

export const useHandleLogout = () => {
  const router = useRouter();
  return () => {
    router.push("/menu");
  };
};
