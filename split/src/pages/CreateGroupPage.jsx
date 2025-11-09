import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { 
  ArrowBack, 
  MonetizationOn, 
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const emojiOptions = [
  '🏠', '🏔️', '✈️', '🎉', '🍕', '🎮', '📚', '🏋️',
  '🎬', '🎵', '☕', '🌴', '🚗', '🎨', '⚽', '🎯',
];

export default function CreateGroupPage({ onBack, onCreate }) {
  const [groupName, setGroupName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🏠');
  
  // Servicios
  const [servicios, setServicios] = useState([]);
  const [servicioNombre, setServicioNombre] = useState('');
  const [servicioWallet, setServicioWallet] = useState('');
  
  // Miembros
  const [miembros, setMiembros] = useState([]);
  const [miembroEmail, setMiembroEmail] = useState('');

  const handleAddServicio = () => {
    if (servicioNombre.trim() && servicioWallet.trim() && servicios.length < 10) {
      setServicios([
        ...servicios,
        {
          id: Date.now(),
          nombre: servicioNombre,
          wallet: servicioWallet,
        }
      ]);
      setServicioNombre('');
      setServicioWallet('');
    }
  };

  const handleRemoveServicio = (id) => {
    setServicios(servicios.filter(s => s.id !== id));
  };

  const handleAddMiembro = () => {
    if (miembroEmail.trim() && /\S+@\S+\.\S+/.test(miembroEmail)) {
      if (!miembros.find(m => m.email === miembroEmail)) {
        setMiembros([
          ...miembros,
          {
            id: Date.now(),
            email: miembroEmail,
            estado: 'pendiente',
          }
        ]);
        setMiembroEmail('');
      }
    }
  };

  const handleRemoveMiembro = (id) => {
    setMiembros(miembros.filter(m => m.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      onCreate({
        nombre: groupName,
        emoji: selectedEmoji,
        servicios,
        miembros,
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#2a2a2a',
        pb: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: '#2a2a2a',
          pt: 3,
          pb: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={onBack}
          sx={{
            color: '#888',
            mr: 2,
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            color: '#888',
            fontWeight: 400,
          }}
        >
          Crear Grupo
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ px: 3 }}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            p: 4,
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
          }}
        >
          {/* Money Icon */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <MonetizationOn
              sx={{
                fontSize: 60,
                color: '#ffd700',
              }}
            />
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Nombre del grupo */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Nombre del grupo
            </Typography>
            <TextField
              fullWidth
              placeholder="Ej: Casa, Viaje, Amigos..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: '#f5f5f5',
                  '& fieldset': { border: 'none' },
                  height: '56px',
                },
              }}
            />

            {/* Seleccionar emoji */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Elige un ícono
            </Typography>
            <Grid container spacing={1.5} sx={{ mb: 4 }}>
              {emojiOptions.map((emoji) => (
                <Grid item xs={3} key={emoji}>
                  <Box
                    onClick={() => setSelectedEmoji(emoji)}
                    sx={{
                      bgcolor: selectedEmoji === emoji ? '#ffd700' : '#f5f5f5',
                      borderRadius: 2,
                      p: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: selectedEmoji === emoji ? '2px solid #000' : '2px solid transparent',
                      '&:hover': {
                        bgcolor: selectedEmoji === emoji ? '#ffd700' : '#e8e8e8',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem' }}>{emoji}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Servicios */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Agregar servicios (opcional)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
              Máximo 10 servicios
            </Typography>

            <TextField
              fullWidth
              placeholder="Nombre del servicio (Ej: Luz, Agua, Netflix)"
              value={servicioNombre}
              onChange={(e) => setServicioNombre(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: '#f5f5f5',
                  '& fieldset': { border: 'none' },
                  height: '56px',
                },
              }}
            />

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Wallet del servicio"
                value={servicioWallet}
                onChange={(e) => setServicioWallet(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: '#f5f5f5',
                    '& fieldset': { border: 'none' },
                    height: '56px',
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddServicio}
                disabled={!servicioNombre.trim() || !servicioWallet.trim() || servicios.length >= 10}
                sx={{
                  minWidth: '56px',
                  height: '56px',
                  borderRadius: 3,
                  bgcolor: '#000',
                  '&:hover': { bgcolor: '#333' },
                }}
              >
                <AddIcon />
              </Button>
            </Box>

            {servicios.length > 0 && (
              <List sx={{ bgcolor: '#f5f5f5', borderRadius: 2, mb: 3, p: 1 }}>
                {servicios.map((servicio) => (
                  <ListItem
                    key={servicio.id}
                    sx={{
                      bgcolor: 'white',
                      borderRadius: 2,
                      mb: 1,
                      '&:last-child': { mb: 0 },
                    }}
                  >
                    <ListItemText
                      primary={servicio.nombre}
                      secondary={`Wallet: ${servicio.wallet.substring(0, 20)}...`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveServicio(servicio.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}

            {/* Miembros */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Agregar miembros (opcional)
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Email del miembro"
                type="email"
                value={miembroEmail}
                onChange={(e) => setMiembroEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMiembro())}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: '#f5f5f5',
                    '& fieldset': { border: 'none' },
                    height: '56px',
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddMiembro}
                disabled={!miembroEmail.trim()}
                sx={{
                  minWidth: '56px',
                  height: '56px',
                  borderRadius: 3,
                  bgcolor: '#000',
                  '&:hover': { bgcolor: '#333' },
                }}
              >
                <AddIcon />
              </Button>
            </Box>

            {miembros.length > 0 && (
              <Box sx={{ mb: 3 }}>
                {miembros.map((miembro) => (
                  <Chip
                    key={miembro.id}
                    label={miembro.email}
                    onDelete={() => handleRemoveMiembro(miembro.id)}
                    sx={{
                      mr: 1,
                      mb: 1,
                      bgcolor: '#fff3cd',
                      '& .MuiChip-deleteIcon': {
                        color: '#666',
                      },
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Botones */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={!groupName.trim()}
              sx={{
                mb: 2,
                py: 2,
                borderRadius: 10,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                bgcolor: '#000',
                color: '#fff',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#333',
                  boxShadow: 'none',
                },
                '&:disabled': {
                  bgcolor: '#e0e0e0',
                  color: '#999',
                },
              }}
            >
              Crear Grupo
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={onBack}
              sx={{
                py: 2,
                borderRadius: 10,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                borderColor: '#e0e0e0',
                color: '#666',
                '&:hover': {
                  borderColor: '#d5d5d5',
                  bgcolor: 'transparent',
                },
              }}
            >
              Cancelar
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
