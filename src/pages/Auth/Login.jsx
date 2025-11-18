import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 👈 1. Importamos nuestro Contexto

// 2. Importamos los iconos (ahora sí están instalados)
import {
    ArrowLeftStartOnRectangleIcon,
    LockClosedIcon,
    AtSymbolIcon,
} from '@heroicons/react/24/outline';

// ❌ Quitamos: GuestLayout, Head, useForm, router, axios (Inertia)

export default function LoginPage() {
  // 3. Esta es la lógica de React Pura (reemplaza a useForm)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null); // Para mostrar errores de login

  // 4. Obtenemos las funciones de nuestro Contexto y Router
  const { login, token } = useAuth();
  const navigate = useNavigate();

  // 5. Esta es la nueva función de Submit
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    try {
      // Llamamos a la función 'login' del AuthContext
      await login(email, password);
      
      // Si tiene éxito, navegamos al Dashboard
      navigate('/dashboard');

    } catch (err) {
      // Si falla, mostramos el error
      if (err.response && (err.response.status === 401 || err.response.status === 404)) {
        setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      } else {
        setError('Ocurrió un error de red. Inténtalo más tarde.');
      }
    } finally {
        setProcessing(false); // Asegúrate de detener el spinner
    }
  };

  // 6. Si ya hay un token, no mostramos el login, redirigimos
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // 7. Este es TU JSX visual
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover saturate-125 contrast-110 brightness-105"
          src="/videos/intranet-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-indigo-950/30 backdrop-blur-[1px]"></div>

        <div className="relative z-10 w-full max-w-md p-8 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] text-white transition-transform duration-300 hover:scale-[1.01]">
          <div className="flex flex-col items-center mb-8 text-center">
            <ArrowLeftStartOnRectangleIcon className="w-12 h-12 text-indigo-200 mb-3" />
            <h1 className="text-3xl font-extrabold text-white drop-shadow-md">Bienvenido</h1>
            <p className="text-indigo-100 mt-2">Ingresa tus credenciales para continuar</p>
          </div>

          {/* 8. Lógica de error actualizada */}
          {error && (
            <div className="mb-4 font-medium text-sm text-red-200 p-3 bg-red-500/30 rounded-lg backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-indigo-100 mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="relative">
                <AtSymbolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-300" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email} // 
                  className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white/15 text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition border-white/20"
                  placeholder="tu@correo.com"
                  autoComplete="username"
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-indigo-100 mb-2" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-300" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password} // '
                  className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white/15 text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition border-white/20"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition duration-200 disabled:opacity-50"
                disabled={processing} 
              >
                {processing ? ( 
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-xs text-indigo-200">
            Para soporte técnico, llama al{' '}
            <span className="font-semibold">555-FINANSUEÑOS</span>.
          </div>
        </div>
      </div>
    </>
  );
}