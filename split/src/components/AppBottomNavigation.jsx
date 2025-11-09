import React from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Group as GroupIcon, Person as PersonIcon } from "@mui/icons-material";

export default function AppBottomNavigation({ value, onChange }) {
  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        bgcolor: "#ffffff",
        borderTop: "2px solid #e0e0e0",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        "& .MuiBottomNavigationAction-root": {
          color: "#999",
          minWidth: 80,
          padding: "8px 12px",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#666",
          },
        },
        "& .Mui-selected": {
          color: "#000",
          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.85rem",
            fontWeight: 600,
          },
          "& .MuiSvgIcon-root": {
            transform: "scale(1.1)",
          },
        },
        "& .MuiBottomNavigationAction-label": {
          fontSize: "0.75rem",
          fontWeight: 500,
          marginTop: "4px",
        },
      }}
    >
      <BottomNavigationAction
        label="Grupos"
        icon={
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              bgcolor: value === 0 ? "#ffd700" : "transparent",
              transition: "all 0.3s ease",
            }}
          >
            <GroupIcon sx={{ fontSize: 28 }} />
          </Box>
        }
      />
      <BottomNavigationAction
        label="Perfil"
        icon={
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              bgcolor: value === 1 ? "#ffd700" : "transparent",
              transition: "all 0.3s ease",
            }}
          >
            <PersonIcon sx={{ fontSize: 28 }} />
          </Box>
        }
      />
    </BottomNavigation>
  );
}
