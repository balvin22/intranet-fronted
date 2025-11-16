import React from 'react';

// Acepta las props que le pasaste: title, description, icon
export default function AreaCard({ title, description, icon }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg h-full border-t-4 border-violet-500">
      {/* Icono */}
      <div className="text-4xl text-violet-600 mb-4">
        {icon}
      </div>
      
      {/* Título */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      {/* Descripción */}
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}