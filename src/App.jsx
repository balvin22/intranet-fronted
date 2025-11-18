// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
// --- Páginas Públicas ---
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/Login";

// --- Páginas Privadas ---
import DashboardPage from "./pages/Dashboard/DashboardPage";

import ReportsLayout from "./pages/Reports/ReportsLayout";
import VentasReportUploader from "./pages/Reports/VentasReportUploader";
import LegalReportUploader from "./pages/Reports/LegalReportUploader";
// (Crearemos este placeholder)
const CarteraReportUploader = () => <div>Módulo de Carga de Cartera</div>;
import Centrales from './pages/Reports/Centrales';

// --- Placeholders para las nuevas rutas del Sidebar ---
// (Importamos el layout solo para los placeholders)
import AuthenticatedLayout from "./components/Layout/AuthenticatedLayout";
const UserAdminPage = () => (
  <AuthenticatedLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Gestión de Usuarios
      </h2>
    }
  >
    <div>Contenido de Gestión de Usuarios</div>
  </AuthenticatedLayout>
);
const RolesAdminPage = () => (
  <AuthenticatedLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Gestión de Roles
      </h2>
    }
  >
    <div>Contenido de Gestión de Roles</div>
  </AuthenticatedLayout>
);
const DocumentsPage = () => (
  <AuthenticatedLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Documentos
      </h2>
    }
  >
    <div>Contenido de Documentos</div>
  </AuthenticatedLayout>
);
const InventoryPage = () => (
  <AuthenticatedLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Inventario
      </h2>
    }
  >
    <div>Contenido de Inventario</div>
  </AuthenticatedLayout>
);
const CarteraPage = () => (
  <AuthenticatedLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Cartera
      </h2>
    }
  >
    <div>Contenido de Cartera</div>
  </AuthenticatedLayout>
);
const HelpDeskPage = () => (
  <AuthenticatedLayout
    header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Mesa de Ayuda
      </h2>
    }
  >
    <div>Contenido de Mesa de Ayuda</div>
  </AuthenticatedLayout>
);
import GuestLayout from "./components/Layout/GuestLayout";
const SoportePage = () => (
  <GuestLayout>
    <div>Página de Soporte</div>
  </GuestLayout>
);

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

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route
        path="/"
        element={
          <GuestRoute>
            <HomePage />
          </GuestRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/soporte"
        element={
          <GuestRoute>
            <SoportePage />
          </GuestRoute>
        }
      />

      {/* Rutas Privadas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reportes"
        element={
          <ProtectedRoute>
            <ReportsLayout />
          </ProtectedRoute>
        }
      >
        {/* Esta es la ruta por defecto (ej. /reportes), redirige al primer tab */}
        <Route index element={<Navigate to="ventas" replace />} />

        {/* Estas rutas se renderizan DENTRO del <Outlet> de ReportsLayout */}
        <Route path="ventas" element={<VentasReportUploader />} />
        <Route path="legal" element={<LegalReportUploader />} />
        <Route path="cartera" element={<CarteraReportUploader />} />
        <Route path="centrales" element={<Centrales />} />
      </Route>

      {/* (Otras rutas privadas) */}
      <Route
        path="/admin/usuarios"
        element={
          <ProtectedRoute>
            <UserAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/roles"
        element={
          <ProtectedRoute>
            <RolesAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documentos"
        element={
          <ProtectedRoute>
            <DocumentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventario"
        element={
          <ProtectedRoute>
            <InventoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cartera"
        element={
          <ProtectedRoute>
            <CarteraPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mesa-de-ayuda"
        element={
          <ProtectedRoute>
            <HelpDeskPage />
          </ProtectedRoute>
        }
      />

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
