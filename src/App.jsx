// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
// --- Páginas Públicas ---
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/Auth/Login';

// --- Páginas Privadas ---
import DashboardPage from './pages/Dashboard/DashboardPage';

// --- Placeholders para las nuevas rutas del Sidebar ---
// (Importamos el layout solo para los placeholders)
import AuthenticatedLayout from './components/layout/AuthenticatedLayout';

const UserAdminPage = () => <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestión de Usuarios</h2>}><div>Contenido de Gestión de Usuarios</div></AuthenticatedLayout>;
const RolesAdminPage = () => <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestión de Roles</h2>}><div>Contenido de Gestión de Roles</div></AuthenticatedLayout>;
const ReportsPage = () => <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reportes</h2>}><div>Contenido de Reportes</div></AuthenticatedLayout>;
const DocumentsPage = () => <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Documentos</h2>}><div>Contenido de Documentos</div></AuthenticatedLayout>;
const InventoryPage = () => <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventario</h2>}><div>Contenido de Inventario</div></AuthenticatedLayout>;
const CarteraPage = () => <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cartera</h2>}><div>Contenido de Cartera</div></AuthenticatedLayout>;
const HelpDeskPage = () => <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mesa de Ayuda</h2>}><div>Contenido de Mesa de Ayuda</div></AuthenticatedLayout>;

// (Componente provisional para Soporte - necesita importarse desde GuestLayout)
import GuestLayout from './components/layout/GuestLayout';
const SoportePage = () => <GuestLayout><div>Página de Soporte</div></GuestLayout>;


// --- Componentes Provisionales (Solo queda el Dashboard) ---
const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Dashboard - ¡Bienvenido, {user?.name}!</h1>{" "}
      {/* Usamos ? por si user es null */}
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};
// --- Fin de Componentes Provisionales ---

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function GuestRoute({ children }) {
  const { token } = useAuth();
  if (token) {
    // Si hay token, llévalo al dashboard
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

// 4. El "Router" principal
function AppRoutes() {
  return (
     <Routes>
      {/* Rutas Públicas (Solo para Invitados) */}
      <Route path="/" element={<GuestRoute><HomePage /></GuestRoute>} />
      <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/soporte" element={<GuestRoute><SoportePage /></GuestRoute>} />

      {/* Rutas Privadas (Requieren Login) */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /> 
      
      {/* 2. 👇 ¡Añadimos todas las rutas del Sidebar! */}
      <Route path="/admin/usuarios" element={<ProtectedRoute><UserAdminPage /></ProtectedRoute>} />
      <Route path="/admin/roles" element={<ProtectedRoute><RolesAdminPage /></ProtectedRoute>} />
      <Route path="/reportes" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      <Route path="/documentos" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
      <Route path="/inventario" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
      <Route path="/cartera" element={<ProtectedRoute><CarteraPage /></ProtectedRoute>} />
      <Route path="/mesa-de-ayuda" element={<ProtectedRoute><HelpDeskPage /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

// (El componente App se queda igual)
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
