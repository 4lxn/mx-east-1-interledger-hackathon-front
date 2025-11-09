import React, { useState } from "react";
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
} from "@mui/material";
import {
  ArrowBack,
  MonetizationOn,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";

const emojiOptions = [
  "🏠",
  "🏔️",
  "✈️",
  "🎉",
  "🍕",
  "🎮",
  "📚",
  "🏋️",
  "🎬",
  "🎵",
  "☕",
  "🌴",
  "🚗",
  "🎨",
  "⚽",
  "🎯",
];

export default function CreateGroupPage({ user, onBack, onCreate }) {
  const [groupName, setGroupName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🏠");

  // Services
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceWallet, setServiceWallet] = useState("");

  // Members (pending members, creator will be added automatically)
  const [members, setMembers] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");

  const handleAddService = () => {
    if (serviceName.trim() && serviceWallet.trim() && services.length < 10) {
      setServices([
        ...services,
        {
          id: Date.now(),
          name: serviceName,
          wallet: serviceWallet,
        },
      ]);
      setServiceName("");
      setServiceWallet("");
    }
  };

  const handleRemoveService = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const handleAddMember = () => {
    if (memberEmail.trim() && /\S+@\S+\.\S+/.test(memberEmail)) {
      if (!members.find((m) => m.email === memberEmail)) {
        setMembers([
          ...members,
          {
            id: Date.now(),
            email: memberEmail,
            status: "pending",
          },
        ]);
        setMemberEmail("");
      }
    }
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      onCreate({
        name: groupName,
        emoji: selectedEmoji,
        services,
        members, // These will be pending members
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#2a2a2a",
        pb: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#2a2a2a",
          pt: 3,
          pb: 2,
          px: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={onBack}
          sx={{
            color: "#888",
            mr: 2,
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            color: "#888",
            fontWeight: 400,
          }}
        >
          Create Group
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ px: 3 }}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            p: 4,
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
          }}
        >
          {/* Money Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <MonetizationOn
              sx={{
                fontSize: 60,
                color: "#ffd700",
              }}
            />
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Group Name */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Group Name
            </Typography>
            <TextField
              fullWidth
              placeholder="E.g: House, Trip, Friends..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#f5f5f5",
                  "& fieldset": { border: "none" },
                  height: "56px",
                },
              }}
            />

            {/* Select Emoji */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Choose an Icon
            </Typography>
            <Grid
              container
              spacing={1.5}
              sx={{ mb: 4 }}
              justifyContent="center"
              alignItems="center"
            >
              {emojiOptions.map((emoji) => (
                <Grid item xs={3} key={emoji}>
                  <Box
                    onClick={() => setSelectedEmoji(emoji)}
                    sx={{
                      bgcolor: selectedEmoji === emoji ? "#ffd700" : "#f5f5f5",
                      borderRadius: 2,
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      border:
                        selectedEmoji === emoji
                          ? "2px solid #000"
                          : "2px solid transparent",
                      "&:hover": {
                        bgcolor:
                          selectedEmoji === emoji ? "#ffd700" : "#e8e8e8",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }}>{emoji}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Services */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Add Services (optional)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
              Maximum 10 services
            </Typography>

            <TextField
              fullWidth
              placeholder="Service name (E.g: Electricity, Water, Netflix)"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#f5f5f5",
                  "& fieldset": { border: "none" },
                  height: "56px",
                },
              }}
            />

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Service wallet"
                value={serviceWallet}
                onChange={(e) => setServiceWallet(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#f5f5f5",
                    "& fieldset": { border: "none" },
                    height: "56px",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddService}
                disabled={
                  !serviceName.trim() ||
                  !serviceWallet.trim() ||
                  services.length >= 10
                }
                sx={{
                  minWidth: "56px",
                  height: "56px",
                  borderRadius: 3,
                  bgcolor: "#000",
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                <AddIcon />
              </Button>
            </Box>

            {services.length > 0 && (
              <List sx={{ bgcolor: "#f5f5f5", borderRadius: 2, mb: 3, p: 1 }}>
                {services.map((service) => (
                  <ListItem
                    key={service.id}
                    sx={{
                      bgcolor: "white",
                      borderRadius: 2,
                      mb: 1,
                      "&:last-child": { mb: 0 },
                    }}
                  >
                    <ListItemText
                      primary={service.name}
                      secondary={`Wallet: ${service.wallet.substring(
                        0,
                        20
                      )}...`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveService(service.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}

            {/* Members */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Add Members (optional)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
              You will be added as a member automatically
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Member email"
                type="email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddMember())
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#f5f5f5",
                    "& fieldset": { border: "none" },
                    height: "56px",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddMember}
                disabled={!memberEmail.trim()}
                sx={{
                  minWidth: "56px",
                  height: "56px",
                  borderRadius: 3,
                  bgcolor: "#000",
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                <AddIcon />
              </Button>
            </Box>

            {members.length > 0 && (
              <Box sx={{ mb: 3 }}>
                {members.map((member) => (
                  <Chip
                    key={member.id}
                    label={member.email}
                    onDelete={() => handleRemoveMember(member.id)}
                    sx={{
                      mr: 1,
                      mb: 1,
                      bgcolor: "#fff3cd",
                      "& .MuiChip-deleteIcon": {
                        color: "#666",
                      },
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Buttons */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={!groupName.trim()}
              sx={{
                mb: 2,
                py: 2,
                borderRadius: 10,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                bgcolor: "#000",
                color: "#fff",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#333",
                  boxShadow: "none",
                },
                "&:disabled": {
                  bgcolor: "#e0e0e0",
                  color: "#999",
                },
              }}
            >
              Create Group
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={onBack}
              sx={{
                py: 2,
                borderRadius: 10,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                borderColor: "#e0e0e0",
                color: "#666",
                "&:hover": {
                  borderColor: "#d5d5d5",
                  bgcolor: "transparent",
                },
              }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
