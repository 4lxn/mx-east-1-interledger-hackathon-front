import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Fab,
  IconButton,
  Chip,
  Button,
  Modal,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  MonetizationOn,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function GroupDetailPage({ 
  grupo, 
  onBack, 
  onAddService,
  userWallet = 'wallet-address-1234',
  userBalance = 150.50,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [openPayModal, setOpenPayModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Calcular deudas por miembro
  const calcularDeudas = () => {
    if (!grupo.servicios || grupo.servicios.length === 0) return [];
    
    const miembrosConfirmados = grupo.miembros?.filter(m => m.estado === 'confirmado') || [];
    const totalMiembros = miembrosConfirmados.length + 1; // +1 por el creador
    
    return grupo.servicios.map(servicio => ({
      ...servicio,
      montoPorPersona: servicio.total / totalMiembros,
    }));
  };

  const deudas = calcularDeudas();
  const totalAPagar = deudas.reduce((sum, d) => sum + d.montoPorPersona, 0);

  const handlePay = (servicio = null) => {
    setSelectedPayment(servicio);
    setOpenPayModal(true);
  };

  const handleConfirmPayment = () => {
    // Aquí iría la lógica de pago
    console.log('Procesando pago:', selectedPayment);
    setOpenPayModal(false);
    setSelectedPayment(null);
  };

  const handleCloseModal = () => {
    setOpenPayModal(false);
    setSelectedPayment(null);
  };

  const montoAPagar = selectedPayment ? selectedPayment.montoPorPersona : totalAPagar;
  const nuevoBalance = userBalance - montoAPagar;
  const saldoInsuficiente = nuevoBalance < 0;

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
            overflow: 'hidden',
            minHeight: 'calc(100vh - 120px)',
          }}
        >
          {/* Header del grupo */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pt: 4,
              pb: 2,
            }}
          >
            {/* App Icon */}
            <MonetizationOn
              sx={{
                fontSize: 40,
                color: '#ffd700',
                mb: 2,
              }}
            />

            {/* Group Icon */}
            <Box
              sx={{
                width: 100,
                height: 100,
                bgcolor: '#f4d56f',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: '4rem' }}>
                {grupo.emoji}
              </Typography>
            </Box>

            {/* Group Name */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              {grupo.nombre}
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
              },
            }}
          >
            <Tab label="Servicios" />
            <Tab label="Miembros" />
            <Tab label="Pagos" />
          </Tabs>

          {/* Tab Servicios */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ px: 3 }}>
              {grupo.servicios && grupo.servicios.length > 0 ? (
                grupo.servicios.map((servicio) => (
                  <Card
                    key={servicio.id}
                    sx={{
                      mb: 2,
                      bgcolor: '#f5f5f5',
                      borderRadius: 3,
                      boxShadow: 'none',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {servicio.nombre}
                        </Typography>
                        <Chip
                          label={`$${servicio.total.toFixed(2)}`}
                          sx={{
                            bgcolor: '#ffd700',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        Vencimiento: {servicio.fechaVencimiento || 'Sin fecha'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#999', fontSize: '0.85rem' }}>
                        Wallet: {servicio.wallet.substring(0, 20)}...
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" sx={{ color: '#999', mb: 1 }}>
                    No hay servicios listados
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#aaa' }}>
                    Agrega servicios para empezar a dividir gastos
                  </Typography>
                </Box>
              )}

              {/* FAB para agregar servicio */}
              <Fab
                color="primary"
                aria-label="add"
                onClick={onAddService}
                sx={{
                  position: 'fixed',
                  bottom: 30,
                  right: 30,
                  bgcolor: 'white',
                  color: '#000',
                  border: '2px solid #000',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                }}
              >
                <AddIcon />
              </Fab>
            </Box>
          </TabPanel>

          {/* Tab Miembros */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ px: 3 }}>
              {deudas.length > 0 && (
                <>
                  {grupo.miembros?.filter(m => m.estado === 'confirmado').map((miembro) => {
                    const montoPorPersona = deudas.reduce((sum, d) => sum + d.montoPorPersona, 0);
                    const haPagado = miembro.pagado || false;

                    return (
                      <Card
                        key={miembro.id}
                        sx={{
                          mb: 2,
                          bgcolor: haPagado ? '#e8f5e9' : '#fff3cd',
                          borderRadius: 3,
                          boxShadow: 'none',
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography sx={{ fontSize: '2rem', mr: 2 }}>
                                {miembro.avatar || '👤'}
                              </Typography>
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {miembro.nombre || miembro.email}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                  Debe: ${montoPorPersona.toFixed(2)}
                                </Typography>
                              </Box>
                            </Box>
                            {haPagado ? (
                              <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 32 }} />
                            ) : (
                              <CancelIcon sx={{ color: '#ff9800', fontSize: 32 }} />
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    );
                  })}
                </>
              )}

              {/* Miembros pendientes */}
              {grupo.miembros?.filter(m => m.estado === 'pendiente').length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ color: '#999', mb: 2 }}>
                    Pendientes de aceptar
                  </Typography>
                  {grupo.miembros.filter(m => m.estado === 'pendiente').map((miembro) => (
                    <Chip
                      key={miembro.id}
                      label={miembro.email}
                      sx={{
                        mr: 1,
                        mb: 1,
                        bgcolor: '#f5f5f5',
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* Tab Pagos */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ px: 3 }}>
              {deudas.length > 0 ? (
                <>
                  <Card
                    sx={{
                      mb: 3,
                      bgcolor: '#f4d56f',
                      borderRadius: 3,
                      boxShadow: 'none',
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                        Total a pagar
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        ${totalAPagar.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Desglose por concepto
                  </Typography>

                  {deudas.map((servicio) => (
                    <Card
                      key={servicio.id}
                      sx={{
                        mb: 2,
                        bgcolor: '#f5f5f5',
                        borderRadius: 3,
                        boxShadow: 'none',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {servicio.nombre}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                              Tu parte: ${servicio.montoPorPersona.toFixed(2)}
                            </Typography>
                          </Box>
                          <Button
                            variant="contained"
                            onClick={() => handlePay(servicio)}
                            sx={{
                              bgcolor: '#000',
                              '&:hover': { bgcolor: '#333' },
                              textTransform: 'none',
                              borderRadius: 2,
                            }}
                          >
                            Pagar
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => handlePay(null)}
                    sx={{
                      mt: 2,
                      py: 2,
                      bgcolor: '#ffd700',
                      color: '#000',
                      fontWeight: 600,
                      '&:hover': { bgcolor: '#ffed4e' },
                      textTransform: 'none',
                      borderRadius: 3,
                    }}
                  >
                    Pagar Todo (${totalAPagar.toFixed(2)})
                  </Button>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" sx={{ color: '#999' }}>
                    No hay pagos pendientes
                  </Typography>
                </Box>
              )}
            </Box>
          </TabPanel>
        </Box>
      </Container>

      {/* Modal de Pago */}
      <Modal
        open={openPayModal}
        onClose={handleCloseModal}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'white',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Confirmar Pago
          </Typography>

          {/* Concepto */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              Concepto
            </Typography>
            <Typography variant="h6">
              {selectedPayment ? selectedPayment.nombre : 'Todos los servicios'}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Balance actual */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Balance actual
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                ${userBalance.toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Monto a pagar
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                -${montoAPagar.toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Nuevo balance
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: saldoInsuficiente ? '#f44336' : '#4caf50',
                }}
              >
                ${nuevoBalance.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {/* Botones */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirmPayment}
            disabled={saldoInsuficiente}
            sx={{
              mb: 2,
              py: 1.5,
              bgcolor: '#000',
              '&:hover': { bgcolor: '#333' },
              '&:disabled': {
                bgcolor: '#e0e0e0',
                color: '#999',
              },
              textTransform: 'none',
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            PAGAR
          </Button>

          {saldoInsuficiente && (
            <Button
              fullWidth
              variant="outlined"
              href="https://wallet.interledger-test.dev"
              target="_blank"
              sx={{
                mb: 1,
                py: 1.5,
                borderColor: '#ffd700',
                color: '#000',
                '&:hover': {
                  borderColor: '#ffed4e',
                  bgcolor: '#fff9e6',
                },
                textTransform: 'none',
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Depositar Fondos
            </Button>
          )}

          <Button
            fullWidth
            variant="text"
            onClick={handleCloseModal}
            sx={{
              color: '#666',
              textTransform: 'none',
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
