import React, { useState } from 'react';
import { CircleStackIcon } from '@heroicons/react/24/outline';

export default function CifinUploader() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    console.log("Subiendo archivo Cifin:", file);
    // ... Lógica de API para Cifin ...
    setTimeout(() => setProcessing(false), 1500); // Simulación
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-center space-x-3">
        <CircleStackIcon className="w-8 h-8 text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-800">Cargar Archivo CIFIN</h3>
      </div>
      <p className="text-gray-600 text-sm mt-2 mb-4">
        Esta es la lógica específica para procesar los archivos de Cifin.
      </p>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <button 
          type="submit" 
          disabled={!file || processing}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {processing ? 'Procesando...' : 'Subir Cifin'}
        </button>
      </form>
    </div>
  );
}
