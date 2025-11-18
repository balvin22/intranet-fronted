import React, { useState } from 'react';
import CifinUploader from './Centrales/Cifin';
import DatacreditoUploader from './Centrales/Datacredito';

// Sub-componente para los botones de selección
const ModuleButton = ({ onClick, isActive, children, color }) => {
  const activeClasses = isActive 
    ? `bg-${color}-600 text-white shadow-lg` 
    : `bg-white text-gray-700 hover:bg-gray-50`;
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-6 py-4 text-left font-bold rounded-lg transition ${activeClasses}`}
    >
      {children}
    </button>
  );
};

export default function Centrales() {
  // 1. 👇 ¡LA LÓGICA! Este estado controla qué se muestra.
  const [activeModule, setActiveModule] = useState('cifin'); // 'cifin' o 'datacredito'

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* 2. Botones de Selección */}
      <div className="flex space-x-4 mb-6">
        <ModuleButton
          onClick={() => setActiveModule('cifin')}
          isActive={activeModule === 'cifin'}
          color="blue"
        >
          Central CIFIN
        </ModuleButton>
        <ModuleButton
          onClick={() => setActiveModule('datacredito')}
          isActive={activeModule === 'datacredito'}
          color="blue"
        >
          Central DATACREDITO
        </ModuleButton>
      </div>

      {/* 3. Renderizado Condicional */}
      {/* Aquí es donde se muestra el componente elegido */}
      <div>
        {activeModule === 'cifin' && <CifinUploader />}
        {activeModule === 'datacredito' && <DatacreditoUploader />}
      </div>
    </div>
  );
}