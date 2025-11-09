import React, { useState } from 'react';
import LoginPage from './components/auth/LoginPage';
import MainPage from './pages/MainPage';
import CreateGroupPage from './pages/CreateGroupPage';
import GroupDetailPage from './pages/GroupDetailPage';
import ProfilePage from './pages/ProfilePage';

function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [user, setUser] = useState(null);
  
  const [grupos, setGrupos] = useState([
    {
      id: 1,
      nombre: 'Casa',
      emoji: '🏠',
      servicios: [
        { id: 1, nombre: 'Luz', wallet: 'wallet-luz-123456789', total: 150.00, fechaVencimiento: '15/12/2024' },
        { id: 2, nombre: 'Agua', wallet: 'wallet-agua-987654321', total: 80.00, fechaVencimiento: '20/12/2024' },
        { id: 3, nombre: 'Netflix', wallet: 'wallet-netflix-456789123', total: 15.00, fechaVencimiento: '10/12/2024' },
      ],
      miembros: [
        { id: 1, nombre: 'María García', email: 'maria@example.com', avatar: '🐱', estado: 'confirmado', pagado: true },
        { id: 2, nombre: 'Juan Pérez', email: 'juan@example.com', avatar: '🐶', estado: 'confirmado', pagado: false },
      ],
    },
    {
      id: 2,
      nombre: 'Viaje',
      emoji: '🏔️',
      servicios: [],
      miembros: [],
    },
  ]);

  const [solicitudes, setSolicitudes] = useState([
    { id: 1, grupoId: 3, grupoNombre: 'Amigos', grupoEmoji: '🎉', invitadoPor: 'Pedro López' },
    { id: 2, grupoId: 4, grupoNombre: 'Trabajo', grupoEmoji: '💼', invitadoPor: 'Ana Martínez' },
  ]);

  if (!isAuthenticated) {
    return <LoginPage onLogin={(userData) => {
      console.log('✅ Login exitoso:', userData);
      setIsAuthenticated(true);
      setUser(userData);
    }} />;
  }

  if (currentPage === 'create') {
    return <CreateGroupPage
      onBack={() => {
        console.log('⬅️ Volviendo a main desde create');
        setCurrentPage('main');
      }}
      onCreate={(newGroup) => {
        console.log('➕ Creando grupo:', newGroup);
        const grupo = {
          id: Date.now(),
          ...newGroup,
          servicios: newGroup.servicios || [],
          miembros: newGroup.miembros || [],
        };
        setGrupos([...grupos, grupo]);
        setCurrentPage('main');
      }}
    />;
  }
  
  if (currentPage === 'group-detail') {
    return <GroupDetailPage
      grupo={selectedGroup}
      onBack={() => {
        console.log('⬅️ Volviendo a main desde detalle');
        setCurrentPage('main');
      }}
      onAddService={() => {
        console.log('➕ Agregar servicio');
      }}
      userWallet={user?.wallet}
      userBalance={150.50}
    />;
  }
  
  if (currentPage === 'profile') {
    return <ProfilePage
      user={user}
      onNavigateToGroups={() => {
        console.log('🏠 Navegando a grupos desde perfil');
        setCurrentPage('main');
      }}
      onLogout={() => {
        console.log('👋 Cerrando sesión');
        setIsAuthenticated(false);
        setUser(null);
        setCurrentPage('main');
      }}
    />;
  }
  
  return <MainPage
    grupos={grupos}
    solicitudes={solicitudes}
    onNavigateToCreate={() => {
      console.log('➕ Navegando a crear grupo');
      setCurrentPage('create');
    }}
    onNavigateToProfile={() => {
      console.log('👤 Navegando a perfil');
      setCurrentPage('profile');
    }}
    onNavigateToGroup={(grupo) => {
      console.log('🔍 Navegando a detalle del grupo:', grupo.nombre);
      setSelectedGroup(grupo);
      setCurrentPage('group-detail');
    }}
    onAcceptRequest={(solicitud) => {
      console.log('✅ Aceptando solicitud:', solicitud.grupoNombre);
      const nuevoGrupo = {
        id: solicitud.grupoId,
        nombre: solicitud.grupoNombre,
        emoji: solicitud.grupoEmoji,
        servicios: [],
        miembros: [],
      };
      setGrupos([...grupos, nuevoGrupo]);
      setSolicitudes(solicitudes.filter(s => s.id !== solicitud.id));
    }}
    onRejectRequest={(solicitud) => {
      console.log('❌ Rechazando solicitud:', solicitud.grupoNombre);
      setSolicitudes(solicitudes.filter(s => s.id !== solicitud.id));
    }}
  />;
}

export default AppRouter;
