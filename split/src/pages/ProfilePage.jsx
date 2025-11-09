import React from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import {
  Group as GroupIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  MonetizationOn,
} from '@mui/icons-material';

export default function ProfilePage({ user, onNavigateToGroups, onLogout }) {
  const [navigationValue, setNavigationValue] = React.useState(1);

  const handleNavigationChange = (event, newValue) => {
    setNavigationValue(newValue);
    if (newValue === 0) {
      onNavigateToGroups();
    }
  };

  const menuItems = [
    { icon: <SettingsIcon />, text: 'Configuración', action: () => console.log('Configuración') },
    { icon: <HelpIcon />, text: 'Ayuda', action: () => console.log('Ayuda') },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#2a2a2a',
        pb: 8,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: '#2a2a2a',
          pt: 3,
          pb: 2,
          px: 3,
        }}
      >
      </Box>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ px: 3 }}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            p: 4,
            minHeight: 'calc(100vh - 180px)',
          }}
        >
          {/* Money Icon */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <MonetizationOn
              sx={{
                fontSize: 60,
                color: '#ffd700',
              }}
            />
          </Box>

          {/* Avatar y nombre */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: '#ffd700',
                fontSize: '3rem',
                mb: 2,
              }}
            >
              👨🏻‍💻
            </Avatar>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              {user?.name || 'Usuario'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
              }}
            >
              {user?.email || 'email@ejemplo.com'}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Menú de opciones */}
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={item.action}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#666' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Botón de cerrar sesión */}
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            sx={{
              py: 1.5,
              borderRadius: 10,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              bgcolor: '#e0e0e0',
              color: '#d32f2f',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#d5d5d5',
                boxShadow: 'none',
              },
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Container>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={navigationValue}
        onChange={handleNavigationChange}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: '#d5d5d5',
          borderTop: '1px solid #ccc',
          height: 70,
          '& .MuiBottomNavigationAction-root': {
            color: '#666',
            minWidth: 'auto',
            padding: '6px 12px',
          },
          '& .Mui-selected': {
            color: '#000',
          },
        }}
      >
        <BottomNavigationAction
          label="Grupos"
          icon={<GroupIcon sx={{ fontSize: 28 }} />}
        />
        <BottomNavigationAction
          label="Perfil"
          icon={<PersonIcon sx={{ fontSize: 28 }} />}
        />
      </BottomNavigation>
    </Box>
  );
}
