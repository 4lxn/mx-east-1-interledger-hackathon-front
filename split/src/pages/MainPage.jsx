import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  MonetizationOn,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

export default function MainPage({ 
  grupos = [], 
  solicitudes = [], 
  onNavigateToCreate, 
  onNavigateToProfile,
  onNavigateToGroup,
  onAcceptRequest,
  onRejectRequest,
}) {
  const [navigationValue, setNavigationValue] = useState(0);

  const handleNavigationChange = (event, newValue) => {
    setNavigationValue(newValue);
    if (newValue === 1 && onNavigateToProfile) {
      onNavigateToProfile();
    }
  };

  const handleAddGroup = () => {
    if (onNavigateToCreate) {
      onNavigateToCreate();
    }
  };

  const handleGroupClick = (grupo) => {
    console.log('Navegando a grupo:', grupo);
    if (onNavigateToGroup) {
      onNavigateToGroup(grupo);
    }
  };

  const handleAccept = (solicitud) => {
    if (onAcceptRequest) {
      onAcceptRequest(solicitud);
    }
  };

  const handleReject = (solicitud) => {
    if (onRejectRequest) {
      onRejectRequest(solicitud);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#2a2a2a',
        pb: 8,
      }}
    >
      <Container maxWidth="sm" sx={{ px: 3, pt: 3 }}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            p: 3,
            minHeight: 'calc(100vh - 180px)',
            position: 'relative',
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

          {/* Solicitudes */}
          {solicitudes && solicitudes.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#000',
                  }}
                >
                  Solicitudes
                </Typography>
                <Chip
                  label={solicitudes.length}
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: '#ffd700',
                    fontWeight: 600,
                  }}
                />
              </Box>

              {solicitudes.map((solicitud) => (
                <Card
                  key={solicitud.id}
                  sx={{
                    mb: 2,
                    bgcolor: '#fff3cd',
                    borderRadius: 3,
                    boxShadow: 'none',
                    border: '1px solid #ffd700',
                  }}
                >
                  <CardContent sx={{ pb: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ fontSize: '2rem', mr: 2 }}>
                        {solicitud.grupoEmoji}
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {solicitud.grupoNombre}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {solicitud.invitadoPor} te ha agregado
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<CheckIcon />}
                        onClick={() => handleAccept(solicitud)}
                        sx={{
                          bgcolor: '#4caf50',
                          '&:hover': { bgcolor: '#45a049' },
                          textTransform: 'none',
                          borderRadius: 2,
                        }}
                      >
                        Aceptar
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={() => handleReject(solicitud)}
                        sx={{
                          borderColor: '#f44336',
                          color: '#f44336',
                          '&:hover': {
                            borderColor: '#d32f2f',
                            bgcolor: '#ffebee',
                          },
                          textTransform: 'none',
                          borderRadius: 2,
                        }}
                      >
                        Rechazar
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Título Grupos */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: '#000',
            }}
          >
            Grupos
          </Typography>

          {/* Lista de Grupos */}
          {grupos.length > 0 ? (
            <Box sx={{ mb: 10 }}>
              {grupos.map((grupo) => (
                <Card
                  key={grupo.id}
                  onClick={() => handleGroupClick(grupo)}
                  sx={{
                    mb: 2,
                    bgcolor: '#e0e0e0',
                    borderRadius: 3,
                    boxShadow: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: '#d5d5d5',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: '2.5rem', mr: 2 }}>
                      {grupo.emoji}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: '#666',
                        }}
                      >
                        {grupo.nombre}
                      </Typography>
                      {grupo.miembros && (
                        <Typography variant="body2" sx={{ color: '#999' }}>
                          {grupo.miembros.length} miembro{grupo.miembros.length !== 1 ? 's' : ''}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                py: 6,
                mb: 10,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#999',
                  mb: 1,
                }}
              >
                Aún no has creado ningún grupo
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#aaa',
                }}
              >
                Toca el botón + para crear tu primer grupo
              </Typography>
            </Box>
          )}

          {/* FAB */}
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddGroup}
            sx={{
              position: 'fixed',
              bottom: 100,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: 'white',
              color: '#000',
              border: '2px solid #000',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              width: 64,
              height: 64,
              zIndex: 1000,
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </Fab>
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
