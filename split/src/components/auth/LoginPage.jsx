import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Grid,
} from '@mui/material';
import { Visibility, VisibilityOff, MonetizationOn } from '@mui/icons-material';

const avatarOptions = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
  '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
];

export default function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    wallet: '',
    avatar: '🐶'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!isLogin) {
      if (!formData.wallet) {
        setError('Por favor ingresa tu dirección de wallet');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
    }

    const userData = {
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      wallet: formData.wallet,
      avatar: formData.avatar,
    };

    if (onLogin) {
      onLogin(userData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      wallet: '',
      avatar: '🐶'
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#2a2a2a',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            p: 6,
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                transform: 'rotate(-15deg)'
              }}
            >
              <MonetizationOn sx={{ fontSize: 40, color: '#ffd700' }} />
            </Box>

            <Box
              sx={{
                width: 200,
                height: 200,
                bgcolor: '#f4d56f',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
                overflow: 'hidden'
              }}
            >
              <Typography sx={{ fontSize: '8rem' }}>
                {!isLogin ? formData.avatar : '👨🏻‍💻'}
              </Typography>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  fullWidth
                  placeholder="Nombre completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: '#f5f5f5',
                      '& fieldset': { border: 'none' },
                      height: '56px'
                    }
                  }}
                />

                <TextField
                  fullWidth
                  placeholder="Dirección de Wallet"
                  name="wallet"
                  value={formData.wallet}
                  onChange={handleChange}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: '#f5f5f5',
                      '& fieldset': { border: 'none' },
                      height: '56px'
                    }
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: '#666',
                  }}
                >
                  Elige tu avatar
                </Typography>

                <Grid container spacing={1} sx={{ mb: 3 }}>
                  {avatarOptions.map((avatar) => (
                    <Grid item xs={3} key={avatar}>
                      <Box
                        onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                        sx={{
                          bgcolor: formData.avatar === avatar ? '#ffd700' : '#f5f5f5',
                          borderRadius: 2,
                          p: 1.5,
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          border: formData.avatar === avatar ? '2px solid #000' : '2px solid transparent',
                          '&:hover': {
                            bgcolor: formData.avatar === avatar ? '#ffd700' : '#e8e8e8',
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        <Typography sx={{ fontSize: '2rem' }}>{avatar}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            <TextField
              fullWidth
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: '#f5f5f5',
                  '& fieldset': { border: 'none' },
                  height: '56px'
                }
              }}
            />

            <TextField
              fullWidth
              placeholder="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              sx={{
                mb: !isLogin ? 2 : 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: '#f5f5f5',
                  '& fieldset': { border: 'none' },
                  height: '56px'
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {!isLogin && (
              <TextField
                fullWidth
                placeholder="Confirmar contraseña"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: '#f5f5f5',
                    '& fieldset': { border: 'none' },
                    height: '56px'
                  }
                }}
              />
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mb: 2,
                py: 2,
                borderRadius: 10,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                bgcolor: '#e0e0e0',
                color: '#666',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#d5d5d5',
                  boxShadow: 'none'
                }
              }}
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={toggleMode}
              sx={{
                py: 2,
                borderRadius: 10,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                bgcolor: '#e0e0e0',
                color: '#666',
                border: 'none',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#d5d5d5',
                  border: 'none',
                  boxShadow: 'none'
                }
              }}
            >
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
