// login/funciones/funciones.tsx
"use client";

import axios from 'axios';

export const handleLogin = async (
  e: React.FormEvent,
  email: string,
  pin: string,
  router: any,
  setPin: (pin: string) => void
) => {
  e.preventDefault();

  try {
    const response = await axios.post('/api/login', {
      nombre: email,
      clave: pin,
    });

    if (response.status === 200) {
      localStorage.removeItem("id_usuario");
      const usuario = response.data.usuario;
      localStorage.setItem('nombre', usuario.nombre);
      localStorage.setItem('id_usuario', usuario.id_usuario);
      localStorage.setItem('imagen', usuario.imagen);
      alert('Bienvenido!');
      router.push('/menu');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.error || 'Error de autentificación');
    } else {
      alert('Error desconocido');
    }
    console.error(error);
    setPin('');
  }
};

export const handleNumberClick = (pin: string, setPin: (val: string) => void, num: string) => {
  if (pin.length < 4) setPin(pin + num);
};

export const handleClear = (setPin: (val: string) => void) => {
  setPin('');
};

export const handleBackspace = (pin: string, setPin: (val: string) => void) => {
  setPin(pin.slice(0, -1));
};
