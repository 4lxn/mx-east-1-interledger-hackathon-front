import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import { ArrowBack, MonetizationOn } from '@mui/icons-material';

const emojiOptions = [
  '🏠', '🏔️', '✈️', '🎉', '🍕', '🎮', '📚', '🏋️',
  '🎬', '🎵', '☕', '🌴', '🚗', '🎨', '⚽', '🎯',
];

export default function CreateGroupPage({ onBack, onCreate }) {
  const [groupName, setGroupName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🏠');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      onCreate({
        nombre: groupName,
        emoji: selectedEmoji,
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
       
      </Box>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ px: 3 }}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            p: 4,
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
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
              }}
            >
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
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
              }}
            >
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
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
              }}
            >
              Agregar servicios
            </Typography>
            <TextField
              fullWidth
              placeholder="Ej: Luz, Agua, Netflix..."
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

            {/* Miembros */}
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
              }}
            >
              Agregar miembros
            </Typography>

            <TextField
              fullWidth
              placeholder="Ej: usuario@dominio.com"
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
