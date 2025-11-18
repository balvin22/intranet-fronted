import React, { useState, useEffect } from 'react';
import { CreditCardIcon, ClockIcon, CheckCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios'; 

// CLAVE DE ALMACENAMIENTO
const STORAGE_KEY = 'datacredito_active_job';

// Sub-componente para el Input de Archivo
const FileInput = ({ label, accept, onChange, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input 
      type="file" 
      accept={accept}
      onChange={onChange}
      disabled={disabled}
      // 👇 Cambiado: indigo -> blue
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

export default function DatacreditoUploader() {
  // 1. Inicializar estado leyendo LocalStorage
  const [status, setStatus] = useState(() => {
    const savedJob = localStorage.getItem(STORAGE_KEY);
    return savedJob ? `processing:${savedJob}` : 'idle';
  });

  const [planoFile, setPlanoFile] = useState(null);
  const [correccionesFile, setCorreccionesFile] = useState(null);
  const [empresa, setEmpresa] = useState('FINANSUEÑOS');
  
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Hook para el "Polling"
  useEffect(() => {
    let intervalId = null;

    if (status.startsWith('processing:')) {
      const outputKey = status.split(':')[1];
      localStorage.setItem(STORAGE_KEY, outputKey);

      const checkStatus = async () => {
        try {
          console.log("Polling: Verificando estado de", outputKey);
          const res = await axios.get(`/procesamiento/estado`, {
            params: { key: outputKey }
          });

          if (res.data.status === 'completed') {
            setStatus('completed');
            setDownloadUrl(res.data.download_url);
            clearInterval(intervalId);
          }
        } catch (err) {
            console.error("Error en polling", err);
        }
      };

      checkStatus();
      intervalId = setInterval(checkStatus, 5000); 
    }

    return () => clearInterval(intervalId);
  }, [status]);

  // Función para reiniciar todo
  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStatus('idle');
    setPlanoFile(null);
    setCorreccionesFile(null);
    setDownloadUrl(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!planoFile || !correccionesFile) {
      setError('Por favor, selecciona ambos archivos.');
      return;
    }

    setError('');
    setStatus('uploading'); 

    try {
      // 1. Obtener URLs
      const urlsResponse = await axios.post(`/procesamiento/generar-urls`, {
        plano_filename: planoFile.name,
        correcciones_filename: correccionesFile.name,
        plano_content_type: planoFile.type || 'text/plain',
        correcciones_content_type: correccionesFile.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const { plano, correcciones } = urlsResponse.data;

      // 2. Subir a S3
      const s3Uploader = axios.create();
      delete s3Uploader.defaults.headers.common['Authorization'];
      delete s3Uploader.defaults.baseURL;

      await Promise.all([
        s3Uploader.put(plano.upload_url, planoFile, {
          headers: { 'Content-Type': planoFile.type || 'text/plain' }
        }),
        s3Uploader.put(correcciones.upload_url, correccionesFile, {
          headers: { 'Content-Type': correccionesFile.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
        })
      ]);

      // 3. Iniciar Proceso en Laravel
      const inicioResponse = await axios.post(`/procesamiento/iniciar`, {
        plano_key: plano.key,
        correcciones_key: correcciones.key,
        empresa: empresa
      });
      
      const outputKey = inicioResponse.data.output_key;
      setStatus(`processing:${outputKey}`);
      
    } catch (err) {
      setError('Error al cargar: ' + (err.response?.data?.message || err.message));
      setStatus('idle');
    }
  };

  const isLocked = status !== 'idle';

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl relative overflow-hidden">
      
      {/* Encabezado */}
      <div className="flex items-center space-x-4 mb-6 border-b border-gray-100 pb-4">
        <div className="p-3 bg-blue-100 rounded-full">
             <CreditCardIcon className="w-8 h-8 text-blue-600" />
        </div>
        <div>
             <h3 className="text-xl font-bold text-gray-800">Cargar Archivo DATACREDITO</h3>
             <p className="text-sm text-gray-500">Proceso asíncrono en segundo plano.</p>
        </div>
        
        {/* Botón de Reinicio */}
        {status !== 'idle' && (
             <button 
                onClick={handleReset}
                className="ml-auto text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center"
                title="Cancelar / Nuevo Proceso"
             >
                <TrashIcon className="w-4 h-4 mr-1" />
                Limpiar
             </button>
        )}
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} key={status === 'idle' ? 'idle' : 'busy'}> 
        
        <div className={`space-y-5 transition-opacity duration-300 ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">1. Empresa</label>
            <select
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              disabled={isLocked}
              // 👇 Cambiado: indigo -> blue
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>FINANSUEÑOS</option>
              <option>ARPESOD</option>
            </select>
          </div>

          <FileInput 
            label="2. Archivo Plano (.txt)" 
            accept=".txt"
            onChange={(e) => setPlanoFile(e.target.files[0])}
            disabled={isLocked}
          />
          <FileInput 
            label="3. Archivo de Correcciones (.xlsx)" 
            accept=".xlsx"
            onChange={(e) => setCorreccionesFile(e.target.files[0])}
            disabled={isLocked}
          />
        </div>

        {/* --- ZONA DE ESTADO Y FEEDBACK --- */}
        <div className="mt-8">
            
            {/* ERROR */}
            {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm mb-4 animate-pulse">
                    {error}
                </div>
            )}

            {/* BOTÓN INICIAL */}
            {status === 'idle' && (
                <button 
                    type="submit" 
                    disabled={!planoFile || !correccionesFile}
                    // 👇 Cambiado: indigo -> blue
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
                >
                    Iniciar Proceso
                </button>
            )}

            {/* ESTADO: SUBIENDO */}
            {status === 'uploading' && (
                <div className="flex flex-col items-center justify-center py-8 bg-blue-50 rounded-xl border border-blue-100 animate-fadeIn">
                    <ArrowPathIcon className="w-10 h-10 text-blue-500 animate-spin mb-3" />
                    <span className="text-lg font-bold text-blue-800">Subiendo archivos a la nube...</span>
                    <p className="text-sm text-blue-600 mt-1">Por favor espera, no cierres esta pestaña aún.</p>
                </div>
            )}

            {/* ESTADO: PROCESANDO (Amarillo - Se mantiene para advertencia) */}
            {status.startsWith('processing:') && (
                <div className="flex flex-col items-center justify-center py-8 bg-yellow-50 rounded-xl border border-yellow-100 animate-fadeIn">
                    <ClockIcon className="w-12 h-12 text-yellow-500 animate-bounce mb-3" />
                    <span className="text-lg font-bold text-yellow-800">Procesando datos...</span>
                    <p className="text-sm text-yellow-700 mt-2 text-center max-w-xs">
                        Tu solicitud está en cola. <br/>
                        <strong>Puedes salir de esta página</strong> o recargar; el proceso continuará.
                    </p>
                </div>
            )}

            {/* ESTADO: COMPLETADO (Verde - Se mantiene para éxito) */}
            {status === 'completed' && (
                <div className="flex flex-col items-center justify-center py-8 bg-green-50 rounded-xl border border-green-100 animate-fadeIn">
                    <CheckCircleIcon className="w-14 h-14 text-green-500 mb-3" />
                    <span className="text-xl font-bold text-green-800">¡Reporte Generado!</span>
                    <p className="text-sm text-green-600 mb-6">El archivo está listo para descargar.</p>
                    
                    <a 
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                    >
                        Descargar Resultado (.xlsx)
                    </a>
                    
                    <button 
                        onClick={handleReset}
                        className="mt-4 text-sm text-green-700 hover:underline"
                    >
                        Procesar otro archivo
                    </button>
                </div>
            )}
        </div>

      </form>
    </div>
  );
}