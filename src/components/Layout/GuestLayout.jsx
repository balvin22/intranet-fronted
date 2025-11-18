import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

// Aceptamos 'headerImage' como prop, tal como lo pedía tu Home.jsx
export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Nav />

      {/* Contenido Principal de la Página */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer (Opcional) */}
      <Footer />
    </div>
  );
}