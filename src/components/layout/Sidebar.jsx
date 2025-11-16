import React from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { 
    ArchiveBoxIcon, 
    LifebuoyIcon, 
    DocumentTextIcon, 
    ArrowLeftEndOnRectangleIcon, 
    HomeIcon,
    UsersIcon,       
    ClipboardIcon,     
    BriefcaseIcon,     
    ChartBarIcon, 
} from '@heroicons/react/24/outline'; 

// 2. 👇 Componente NavItem refactorizado para React Router
const NavItem = ({ to, children, icon }) => {
    return (
        <RouterNavLink 
            to={to} 
            className={({ isActive }) => {
                const baseClasses = "flex items-center p-3 my-2 transition-colors duration-200 rounded-lg hover:bg-indigo-600 group";
                const activeClasses = isActive ? "bg-indigo-600 shadow-md transform scale-[1.02]" : "hover:shadow-md";
                return `${baseClasses} ${activeClasses} ${isActive ? 'text-white' : 'text-indigo-200'}`;
            }}
        >
            {({ isActive }) => {
                const Icon = icon;
                return (
                    <>
                        <Icon className={`w-6 h-6 mr-3 ${isActive ? 'text-white' : 'text-indigo-300 group-hover:text-white'}`} />
                        <span className="font-semibold text-sm">{children}</span>
                    </>
                );
            }}
        </RouterNavLink>
    );
};

// 3. 👇 Tu misma función, no cambia nada
const hasAnyRole = (userRoles, rolesRequired) => {
    if (!userRoles || userRoles.length === 0) return false;
    const required = Array.isArray(rolesRequired) ? rolesRequired : [rolesRequired];
    return userRoles.some(role => required.includes(role));
};

// Componente Principal Sidebar
export default function Sidebar({ primaryColor = 'bg-indigo-700' }) {
    
    // 4. 👇 ¡CAMBIO CLAVE! Usamos el AuthContext
    const { user, logout } = useAuth();
    
    // Obtenemos los roles del usuario de nuestro contexto
    const userRoles = user ? user.roles : []; 
    
    // 5. 👇 ¡CORRECCIÓN! Tus roles de Spatie están en mayúscula
    const ROL_ADMINISTRADOR = 'Administrador';
    const ROL_GESTOR = 'Gestor';
    const ROL_ADMINISTRATIVO = 'Administrativo';
    const ROL_ASESOR = 'Asesor';

    return (
        <div className={`flex flex-col h-full p-4 ${primaryColor}`}>
            {/* Logo o Título */}
            <div className="flex items-center justify-between h-16 mb-6">
                <span className="text-white text-xl font-bold tracking-wider transition-transform duration-300 hover:scale-[1.05]">
                    **🚀 App Empresarial**
                </span>
            </div>

            {/* Opciones de Navegación */}
            <nav className="flex-1 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                
                {/* 6. 👇 ¡CAMBIO CLAVE! 'href' se cambia por 'to' */}
                <NavItem to="/dashboard" icon={HomeIcon}>Dashboard</NavItem>
                
                {/* === ADMINISTRACIÓN (ROL: Administrador) === */}
                {hasAnyRole(userRoles, ROL_ADMINISTRADOR) && (
                    <>
                        <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Administración</div>
                        <NavItem to="/admin/usuarios" icon={UsersIcon}>Usuarios</NavItem>
                        <NavItem to="/admin/roles" icon={ClipboardIcon}>Roles y Permisos</NavItem>
                    </>
                )}

                {/* === GESTIÓN (ROLES: Administrador, Gestor) === */}
                {/* 7. 👇 ¡MEJOR PRÁCTICA! (Opcional)
                   También podrías validar por PERMISO, así:
                   {user.permissions.includes('ver reportes') && ( ... )}
                */}
                {hasAnyRole(userRoles, [ROL_ADMINISTRADOR, ROL_GESTOR]) && (
                    <>
                        <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Gestión Empresarial</div>
                        <NavItem to="/reportes" icon={ChartBarIcon}>Reportes Gerenciales</NavItem>
                        <NavItem to="/documentos" icon={DocumentTextIcon}>Documentos Legales</NavItem>
                    </>
                )}
                
                {/* === TAREAS OPERATIVAS (ROLES: Administrador, Gestor, Administrativo) === */}
                {hasAnyRole(userRoles, [ROL_ADMINISTRADOR, ROL_GESTOR, ROL_ADMINISTRATIVO]) && (
                    <>
                        <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Operaciones</div>
                        <NavItem to="/inventario" icon={ArchiveBoxIcon}>Inventario</NavItem>
                    </>
                )}
                
                {/* === ASESORÍA (ROLES: Administrador, Asesor) === */}
                {hasAnyRole(userRoles, [ROL_ADMINISTRADOR, ROL_ASESOR]) && (
                    <>
                        <div className="text-xs font-bold uppercase text-indigo-300 pt-4 pb-1">Comercial</div>
                        <NavItem to="/cartera" icon={BriefcaseIcon}>Clientes y Cartera</NavItem>
                        <NavItem to="/mesa-de-ayuda" icon={LifebuoyIcon}>Mesa de Ayuda</NavItem>
                    </>
                )}
            </nav>

            {/* 8. 👇 ¡CAMBIO CLAVE! El logout ahora es un botón con onClick */}
            <div className="mt-auto pt-4 border-t border-indigo-500/50">
                <button
                    onClick={logout} // Llama a la función de logout del AuthContext
                    className="w-full flex items-center p-3 text-red-300 transition-colors duration-200 rounded-lg hover:bg-red-700 hover:text-white group"
                >
                    <ArrowLeftEndOnRectangleIcon className="w-6 h-6 mr-3 text-red-300 group-hover:text-white" />
                    <span className="font-semibold text-sm">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}