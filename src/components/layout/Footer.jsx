import React from 'react';
// 1. 👇 ¡CAMBIO CLAVE! Importamos el Link de react-router-dom
import { Link } from 'react-router-dom'; 

// 2. Importamos los iconos (ya tienes 'react-icons' instalado)
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaSearch, FaCogs, FaSitemap } from 'react-icons/fa';

// Sub-componente simple para los enlaces en el footer
const FooterLink = ({ href, children }) => (
    <li>
        {/* 3. 👇 ¡CAMBIO CLAVE! 'Link' ahora usa 'to' en lugar de 'href' */}
        <Link 
            to={href} // 'href' de Inertia se convierte en 'to'
            className="text-gray-400 hover:text-yellow-300 transition duration-200 ease-in-out text-sm block py-1"
        >
            {children}
        </Link>
    </li>
);

// Componente para los iconos de utilidad/sociales
// (Este componente es perfecto, no necesita cambios)
const IconWrapper = ({ children }) => (
    <span 
        className="p-3 border border-violet-800 rounded-full text-lg cursor-pointer 
                   hover:bg-red-600 hover:text-white transition duration-300"
    >
        {children}
    </span>
);

export default function Footer() {
    // 4. El JSX (toda la estructura) es IDÉNTICO.
    // No necesita ningún cambio.
    return (
        <footer className="bg-violet-950 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Contenedor Superior (Iconos de Utilidad y Social) */}
                <div className="flex flex-col md:flex-row justify-between items-center pb-8 
                                border-b border-violet-800 mb-8 space-y-6 md:space-y-0">
                    
                    <div className="text-2xl font-extrabold text-yellow-300 tracking-wide">
                        PORTAL CENTRALIZADO
                    </div>

                    <div className="flex space-x-4 text-gray-300">
                        <IconWrapper><FaSearch /></IconWrapper>
                        <IconWrapper><FaCogs /></IconWrapper>
                        <IconWrapper><FaSitemap /></IconWrapper>
                    </div>

                    <div className="flex space-x-6 text-gray-300">
                        <IconWrapper><FaFacebook /></IconWrapper>
                        <IconWrapper><FaInstagram /></IconWrapper>
                        <IconWrapper><FaYoutube /></IconWrapper>
                        <IconWrapper><FaLinkedin /></IconWrapper>
                    </div>
                </div>

                {/* Grid de Enlaces de Navegación del Footer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    
                    {/* Columna 1: Utilities */}
                    <div>
                        <h4 className="text-white font-bold mb-4 border-b border-red-600 pb-1 inline-block">Funciones Internas</h4>
                        <ul className="space-y-1">
                            {/* Usamos '#' para enlaces de placeholder por ahora */}
                            <FooterLink href="#">Mi Perfil / Hoja de Vida</FooterLink>
                            <FooterLink href="#">Nómina y Certificados</FooterLink>
                            <FooterLink href="#">Acceso a Cursos</FooterLink>
                            <FooterLink href="#">Agenda de Reuniones</FooterLink>
                            <FooterLink href="#">Documentos Corporativos</FooterLink>
                        </ul>
                    </div>

                    {/* Columna 2: Explore */}
                    <div>
                        <h4 className="text-white font-bold mb-4 border-b border-red-600 pb-1 inline-block">Explorar Oportunidades</h4>
                        <ul className="space-y-1">
                            <FooterLink href="#">Bolsa de Empleo</FooterLink>
                            <FooterLink href="#">Empresas Aliadas</FooterLink>
                            <FooterLink href="#">Nuestras Áreas</FooterLink>
                            <FooterLink href="#">Noticias del Sector</FooterLink>
                            <FooterLink href="#">Cultura y Valores</FooterLink>
                        </ul>
                    </div>

                    {/* Columna 3: Resources */}
                    <div>
                        <h4 className="text-white font-bold mb-4 border-b border-red-600 pb-1 inline-block">Soporte y Recursos</h4>
                        <ul className="space-y-1">
                            <FooterLink href="#">Manual de Usuario</FooterLink>
                            <FooterLink href="#">Contacto TI</FooterLink>
                            <FooterLink href="#">Política de Datos</FooterLink>
                            <FooterLink href="#">Preguntas Frecuentes</FooterLink>
                            <FooterLink href="#">Reportar un Incidente</FooterLink>
                        </ul>
                    </div>

                    {/* Columna 4: Legal/Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-4 border-b border-red-600 pb-1 inline-block">Legal y Ubicación</h4>
                        <ul className="space-y-1">
                            <FooterLink href="#">Términos y Condiciones</FooterLink>
                            <FooterLink href="#">Política de Privacidad</FooterLink>
                            <FooterLink href="#">Contactar Talento Humano</FooterLink>
                            <FooterLink href="#">Sedes y Oficinas</FooterLink>
                        </ul>
                    </div>
                </div>

                {/* Copyright/Derechos */}
                <div className="mt-12 text-center text-gray-500 text-xs border-t border-violet-800 pt-6">
                    &copy; {new Date().getFullYear()} Intranet Corporativa. Todos los derechos reservados. Desarrollado con Laravel & React.
                </div>
            </div>
        </footer>
    );
}