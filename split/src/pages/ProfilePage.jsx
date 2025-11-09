import React from "react";
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
  Card,
  CardContent,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  MonetizationOn,
  AccountBalanceWallet as WalletIcon,
} from "@mui/icons-material";
import AppBottomNavigation from "../components/AppBottomNavigation";

export default function ProfilePage({ user, onNavigateToGroups, onLogout }) {
  const [navigationValue, setNavigationValue] = React.useState(1);

  const handleNavigationChange = (event, newValue) => {
    setNavigationValue(newValue);
    if (newValue === 0 && onNavigateToGroups) {
      onNavigateToGroups();
    }
  };

  const menuItems = [
    {
      icon: <SettingsIcon />,
      text: "Configuración",
      action: () => console.log("Configuración"),
    },
    { icon: <HelpIcon />, text: "Ayuda", action: () => console.log("Ayuda") },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#2a2a2a",
        pb: 10,
      }}
    >
      <Container maxWidth="sm" sx={{ px: 3, pt: 3 }}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            p: 4,
            minHeight: "calc(100vh - 180px)",
          }}
        >
          {/* Money Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#f4d56f",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <MonetizationOn
                sx={{
                  fontSize: 50,
                  color: "#000",
                }}
              />
            </Box>
          </Box>

          {/* Avatar y nombre */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                bgcolor: "#f4d56f",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Typography sx={{ fontSize: "4rem" }}>
                {user?.avatar || "👤"}
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              {user?.name || "Usuario"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                mb: 2,
              }}
            >
              {user?.email || "email@ejemplo.com"}
            </Typography>

            {/* Wallet Card */}
            {user?.wallet && (
              <Card
                sx={{
                  width: "100%",
                  bgcolor: "#fafafa",
                  borderRadius: 3,
                  boxShadow: "none",
                  border: "1px solid #e0e0e0",
                  mt: 2,
                }}
              >
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "#f4d56f",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <WalletIcon sx={{ color: "#000" }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: "#000" }}
                      >
                        Mi Wallet
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontFamily: "monospace",
                          fontSize: "0.85rem",
                          wordBreak: "break-all",
                        }}
                      >
                        {user.wallet.substring(26, 49)}...
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Menú de opciones */}
          <List sx={{ mb: 3 }}>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={item.action}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: "#fafafa",
                  border: "1px solid #e0e0e0",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s",
                }}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#f4d56f",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {React.cloneElement(item.icon, { sx: { color: "#000" } })}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: 600,
                      color: "#000",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ mb: 3 }} />

          {/* Botón de cerrar sesión */}
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            sx={{
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              bgcolor: "#ffebee",
              color: "#d32f2f",
              border: "1px solid #d32f2f",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#ffcdd2",
                boxShadow: "none",
              },
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Container>

      {/* Bottom Navigation */}
      <AppBottomNavigation
        value={navigationValue}
        onChange={handleNavigationChange}
      />
    </Box>
  );
}
