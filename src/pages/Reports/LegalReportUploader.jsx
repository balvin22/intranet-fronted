import React, { useState } from 'react';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
// (Lógica similar, pero para PDF)

export default function LegalReportUploader() {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // ... (Aquí iría tu lógica específica de submit para PDF) ...

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form>
        <div className="text-center">
          <DocumentChartBarIcon className="w-16 h-16 mx-auto text-blue-300" />
          <h3 className="mt-2 text-2xl font-bold text-gray-900">
            Cargar Documento Legal
          </h3>
          <p className="mt-1 text-gray-500">
            El archivo debe estar en formato .PDF.
          </p>
        </div>
        <div className="mt-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {file && (
            <p className="mt-2 text-green-600 text-sm">
              Archivo seleccionado: {file.name}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}