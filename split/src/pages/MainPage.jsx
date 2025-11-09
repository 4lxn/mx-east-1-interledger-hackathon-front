import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Fab,
  Button,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  MonetizationOn,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import AppBottomNavigation from "../components/AppBottomNavigation";

export default function MainPage({
  groups = [],
  requests = [],
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

  const handleGroupClick = (group) => {
    console.log("Navigating to group:", group);
    if (onNavigateToGroup) {
      onNavigateToGroup(group);
    }
  };

  const handleAccept = (request) => {
    if (onAcceptRequest) {
      onAcceptRequest(request);
    }
  };

  const handleReject = (request) => {
    if (onRejectRequest) {
      onRejectRequest(request);
    }
  };

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
            p: 3,
            minHeight: "calc(100vh - 180px)",
            position: "relative",
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

          {/* Requests */}
          {requests && requests.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  Requests
                </Typography>
                <Chip
                  label={requests.length}
                  size="small"
                  sx={{
                    ml: 2,
                    bgcolor: "#ffd700",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                />
              </Box>

              {requests.map((request) => (
                <Card
                  key={request.id}
                  sx={{
                    mb: 2,
                    bgcolor: "#fff9e6",
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "2px solid #ffd700",
                  }}
                >
                  <CardContent sx={{ pb: 2, "&:last-child": { pb: 2 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          bgcolor: "#f4d56f",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <Typography sx={{ fontSize: "1.8rem" }}>
                          {request.groupEmoji}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {request.groupName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          {request.invitedBy} added you
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<CheckIcon />}
                        onClick={() => handleAccept(request)}
                        sx={{
                          bgcolor: "#4caf50",
                          "&:hover": { bgcolor: "#45a049" },
                          textTransform: "none",
                          borderRadius: 2,
                          fontWeight: 600,
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={() => handleReject(request)}
                        sx={{
                          borderColor: "#f44336",
                          color: "#f44336",
                          "&:hover": {
                            borderColor: "#d32f2f",
                            bgcolor: "#ffebee",
                          },
                          textTransform: "none",
                          borderRadius: 2,
                          fontWeight: 600,
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {/* Groups Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "#000",
            }}
          >
            My Groups
          </Typography>

          {/* Groups List */}
          {groups.length > 0 ? (
            <Box sx={{ mb: 10 }}>
              {groups.map((group) => (
                <Card
                  key={group.id}
                  onClick={() => handleGroupClick(group)}
                  sx={{
                    mb: 2,
                    bgcolor: "#fafafa",
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "1px solid #e0e0e0",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      py: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: "#f4d56f",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <Typography sx={{ fontSize: "2rem" }}>
                        {group.emoji}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "#000",
                        }}
                      >
                        {group.name}
                      </Typography>
                      {group.members && (
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          {group.members.length} member
                          {group.members.length !== 1 ? "s" : ""}
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
                textAlign: "center",
                py: 8,
                mb: 10,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#999",
                  mb: 1,
                }}
              >
                You haven't created any groups yet
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#aaa",
                }}
              >
                Tap the + button to create your first group
              </Typography>
            </Box>
          )}

          {/* FAB */}
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddGroup}
            sx={{
              position: "fixed",
              bottom: 100,
              right: 30,
              bgcolor: "#ffd700",
              color: "#000",
              boxShadow: "0 4px 16px rgba(255,215,0,0.4)",
              width: 64,
              height: 64,
              "&:hover": {
                bgcolor: "#ffed4e",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </Fab>
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
