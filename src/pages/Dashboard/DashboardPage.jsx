import React from "react";
// 1. 👇 ¡CAMBIO CLAVE! Importamos el NUEVO layout y el NUEVO hook
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { useAuth } from "../../context/AuthContext";

// 2. ❌ 'Head' de Inertia eliminado
import {
  HomeIcon,
  ArchiveBoxIcon,
  LifebuoyIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// --- (Todos tus sub-componentes: StatCard, GoalCard, TaskList, CalendarAndBirthdays se quedan IGUAL) ---
// (Los he copiado aquí por completitud)

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      {Icon && (
        <div className={`p-3 rounded-full ${colorClass} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      )}
    </div>
    <p className="mt-1 text-4xl font-extrabold text-gray-900">{value}</p>
  </div>
);
const GoalCard = ({ title, current, target, unit, colorClass }) => {
  const progress = Math.min(100, (current / target) * 100);
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {current}
            <span className="text-base font-normal text-gray-500">
              {" "}
              / {target} {unit}
            </span>
          </p>
        </div>
        <ChartBarIcon className={`w-8 h-8 ${colorClass}`} />
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${colorClass}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm font-medium text-gray-500 mt-1">
          {progress.toFixed(0)}% Completado
        </p>
      </div>
    </div>
  );
};
const TaskList = ({ tasks }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold text-gray-800">
        ✅ Tareas Pendientes
      </h3>
      <span className="text-sm font-bold text-indigo-600">{tasks.length}</span>
    </div>
    <ul className="space-y-3">
      {tasks.slice(0, 5).map((task, index) => (
        <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
          <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{task.title}</p>
            <p className="text-xs text-gray-500">Vence: {task.due}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
const CalendarAndBirthdays = ({ birthdays }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">
      🗓️ Eventos y Cumpleaños
    </h3>
    <ul className="space-y-2">
      {birthdays.map((birthday, index) => (
        <li key={index} className="flex items-center p-2 text-sm text-gray-700">
          🎂 {birthday.name} - {birthday.date}
        </li>
      ))}
    </ul>
  </div>
);
// --- (Fin de los sub-componentes) ---

export default function DashboardPage() {
  // 3. ❌ 'auth' prop eliminado

  // 4. 👇 ¡CAMBIO CLAVE! Obtenemos 'user' de nuestro Context
  const { user } = useAuth();

  // (Tus datos de ejemplo se quedan igual)
  const stats = [
    {
      title: "Usuarios Activos",
      value: "1,200",
      icon: HomeIcon,
      colorClass: "text-indigo-600",
    },
    // ... (etc)
  ];
  const companyGoals = [
    {
      title: "Reducción de Gastos",
      current: 5000,
      target: 10000,
      unit: "USD",
      colorClass: "bg-green-500",
    },
    // ... (etc)
  ];
  const upcomingBirthdays = [
    { name: "Ana P. (Ventas)", date: "15 Nov" } /* ... */,
  ];
  const myTasks = [{ title: "Revisar presupuesto Q4", due: "Hoy" } /* ... */];

  // 5. 👇 ¡Añadido! Un 'fallback' mientras 'user' carga
  if (!user) {
    return <div>Cargando...</div>; // O un componente Spinner
  }

  return (
    <AuthenticatedLayout
      // 6. 👇 Pasa el título como prop
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard General
        </h2>
      }
    >
      {/* El JSX de tu Dashboard es idéntico, solo cambiamos 'auth.user' por 'user' */}
      <div className="w-full max-w-7xl mx-auto">
        {/* 1. Bienvenida */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-indigo-100">
          <h1 className="text-3xl font-bold text-gray-800">
            {/* 8. 👇 ¡CAMBIO CLAVE! */}
            ¡Hola, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Tu rol actual:{" "}
            <span className="font-semibold text-indigo-600">
              {/* 8. 👇 ¡CAMBIO CLAVE! */}
              {user.roles ? user.roles.join(", ") : "Invitado"}
            </span>
            .
          </p>
        </div>

        {/* 2. Tarjetas de Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* 3. Objetivos de la Empresa y Tareas */}
        {/* ... (Tu código de objetivos, no cambia nada) ... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyGoals.map((goal, index) => (
              <GoalCard key={index} {...goal} />
            ))}
          </div>
          <TaskList tasks={myTasks} />
        </div>

        {/* 4. Contenido Adicional: Gráficos y Calendario */}
        {/* ... (Tu código de gráficos, no cambia nada) ... */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              📈 Gráfico de Tendencias
            </h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">
                Aquí se integraría tu componente de gráficos (ej. Chart.js o
                Recharts)
              </p>
            </div>
          </div>
          <CalendarAndBirthdays birthdays={upcomingBirthdays} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
