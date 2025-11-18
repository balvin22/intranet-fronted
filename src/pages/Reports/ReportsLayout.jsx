import React from "react";
// 1. 👇 ¡Importamos NavLink y Outlet!
import { NavLink, Outlet } from "react-router-dom";
import AuthenticatedLayout from '../../components/Layout/AuthenticatedLayout';


import {
  BanknotesIcon,
  DocumentChartBarIcon,
  ArrowUpOnSquareIcon,
  BuildingLibraryIcon
} from "@heroicons/react/24/outline";

// 2. Sub-componente para los TABS
const TabLink = ({ to, children, icon }) => {
  const Icon = icon;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 px-4 py-3 font-semibold text-sm border-b-2
         ${
           isActive
             ? "border-indigo-500 text-indigo-600"
             : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
         }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </NavLink>
  );
};

export default function ReportsLayout() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Centro de Carga de Reportes
        </h2>
      }
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* 3. LA BARRA DE TABS (La Navegación) */}
        <div className="flex space-x-4 border-b border-gray-200 bg-white shadow-sm rounded-t-lg px-4">
          <TabLink to="/reportes/ventas" icon={BanknotesIcon}>
            Reporte de Ventas
          </TabLink>
          <TabLink to="/reportes/legal" icon={DocumentChartBarIcon}>
            Documentos Legales
          </TabLink>
          <TabLink to="/reportes/cartera" icon={ArrowUpOnSquareIcon}>
            Reporte de Cartera
          </TabLink>
           <TabLink to="/reportes/centrales" icon={BuildingLibraryIcon}>
            Centrales de Riesgo
          </TabLink>
        </div>

        {/* 4. EL CONTENIDO DEL TAB */}
        <div className="bg-white p-6 rounded-b-lg shadow-lg">
          <Outlet />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
