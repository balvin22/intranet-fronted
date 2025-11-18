import React, { useState } from 'react';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
// ❌ No se necesita AuthenticatedLayout ni Link

export default function VentasReportUploader() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecciona un archivo CSV.');
      return;
    }
    setProcessing(true);
    // ... (Lógica de API con FormData y Axios iría aquí) ...
    // Simulación:
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess('¡Reporte de ventas procesado!');
    setFile(null);
    setProcessing(false);
  };

  // Esto es solo el "fragmento" de la página, sin layout
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <ArrowUpOnSquareIcon className="w-16 h-16 mx-auto text-indigo-300" />
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            Cargar Reporte de Ventas
          </h3>
          <p className="mt-1 text-gray-500">
            El archivo debe estar en formato .CSV.
          </p>
        </div>
        
        <div className="mt-6">
          <label 
            htmlFor="file-upload" 
            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
          >
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {/* ... (SVG de placeholder) ... */}
                <div className="flex text-sm text-gray-600">
                  <span className="text-indigo-600 font-semibold">Sube un archivo</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv" />
                </div>
                <p className="text-xs text-gray-500">
                  {file ? file.name : 'CSV hasta 10MB'}
                </p>
              </div>
            </div>
          </label>
        </div>

        {error && <div className="mt-4 text-sm text-red-600 font-medium text-center">{error}</div>}
        {success && <div className="mt-4 text-sm text-green-600 font-medium text-center">{success}</div>}

        <div className="mt-6">
          <button
            type="submit"
            disabled={processing || !file}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {processing ? 'Procesando...' : 'Cargar y Procesar Archivo'}
          </button>
        </div>
      </form>
    </div>
  );
}