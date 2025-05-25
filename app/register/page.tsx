'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registrarUsuario } from './funciones/funciones';

export default function RegisterPad() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) setPin(pin + num);
  };

  const handleClear = () => setPin('');
  const handleBackspace = () => setPin(pin.slice(0, -1));

  const handleRegister = async () => {
    if (username && email && pin.length === 4) {
      try {
        const usuario = await registrarUsuario({
          nombre: username,
          correo: email,
          clave: parseInt(pin),
        });

        alert(`Usuario agregado con éxito: ${usuario.nombre}`);
        router.push('/menu');

        setUsername('');
        setEmail('');
        setPin('');
      } catch (error) {
        alert('Error al registrar');
      }
    } else {
      alert('Por favor ingrese un nombre de usuario, correo electrónico y un PIN de 4 dígitos.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="font-space-mono font-bold text-5xl text-center mb-8 text-black">
        <span className="text-black">&gt;</span>WareSoftWare
      </h1>

      <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg p-6 border border-gray-300">
        <div className="mb-4">
          <label className="font-semibold font-lato text-sm block mb-1 text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-200 text-center border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold font-lato text-sm block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-200 text-center border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold font-lato text-sm block mb-1 text-gray-700">4-Pin Code</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-200 text-center border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl"
            >
              {num}
            </button>
          ))}
          <button onClick={handleBackspace} className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl">
            ⌫
          </button>
          <button onClick={() => handleNumberClick('0')} className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl">
            0
          </button>
          <button onClick={handleClear} className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl">
            ✕
          </button>
        </div>

        <button onClick={handleRegister} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg text-lg font-lato shadow">
          Registrar
        </button>
      </div>
    </div>
  );
}
