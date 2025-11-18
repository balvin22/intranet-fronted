import React from 'react';
import Sidebar from './Sidebar'; // Importamos el Sidebar
import { useAuth } from '../../context/AuthContext';

// Acepta 'header' y 'children'
export default function AuthenticatedLayout({ header, children }) {
    const { user } = useAuth(); // Obtenemos el usuario para el TopNav

    return (
        <div className="flex h-screen bg-gray-100">
            {/* 1. Barra Lateral (Sidebar) */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <Sidebar />
                </div>
            </div>

            {/* 2. Contenido Principal (Derecha) */}
            <div className="flex flex-col flex-1 overflow-hidden">
                
                {/* 2a. Barra de Navegación Superior (TopNav) */}
                <header className="bg-white shadow-sm border-b border-gray-200 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Título de la página (viene del prop 'header') */}
                            <div className="flex items-center">
                                {header}
                            </div>
                            
                            {/* Menú de Usuario (Derecha) */}
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-700">
                                    {user ? user.name : 'Usuario'} 
                                </span>
                                {/* Aquí iría un Dropdown de perfil */}
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2b. Contenido de la Página (Scrollable) */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
                    {/* Aquí se renderiza el DashboardPage, UserManagementPage, etc. */}
                    {children}
                </main>
            </div>
        </div>
    );
}