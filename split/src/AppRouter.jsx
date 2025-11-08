import React, { useState } from 'react';
import LoginPage from './components/auth/LoginPage';
import MainPage from './pages/MainPage';
//import CreateGroupPage from './pages/CreateGroupPage';
//import ProfilePage from './pages/ProfilePage';

function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'create', 'profile'
  const [user, setUser] = useState(null);
  const [grupos, setGrupos] = useState([
    { id: 1, nombre: 'Casa', emoji: '🏠' },
    { id: 2, nombre: 'Viaje', emoji: '🏔️' },
  ]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('main');
  };

  const handleCreateGroup = (newGroup) => {
    const grupo = {
      id: Date.now(),
      ...newGroup,
    };
    setGrupos([...grupos, grupo]);
    setCurrentPage('main');
  };

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Navegación entre páginas
  switch (currentPage) {
    case 'create':
      return (
        <CreateGroupPage
          onBack={() => setCurrentPage('main')}
          onCreate={handleCreateGroup}
        />
      );
    
    case 'profile':
      return (
        <ProfilePage
          user={user}
          onNavigateToGroups={() => setCurrentPage('main')}
          onLogout={handleLogout}
        />
      );
    
    case 'main':
    default:
      return (
        <MainPage
          grupos={grupos}
          //onNavigateToCreate={() => setCurrentPage('create')}
          //onNavigateToProfile={() => setCurrentPage('profile')}
        />
      );
  }
}

export default AppRouter;
