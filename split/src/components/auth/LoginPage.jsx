import React, { useState } from "react";
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
} from "@mui/material";
import { Visibility, VisibilityOff, MonetizationOn } from "@mui/icons-material";

const avatarOptions = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
];

export default function LoginPage({ onLogin, onSignup }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    wallet: "$ilp.interledger-test.dev/f5b29886", //THIS IS NOT A REAL WALLET OK?????????🙈
    avatar: "🐶",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!isLoginMode) {
        // Signup validation
        if (!formData.name) {
          setError("Please enter your name");
          setIsLoading(false);
          return;
        }
        if (!formData.wallet) {
          setError("Please enter your wallet address");
          setIsLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        const signupData = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          wallet: formData.wallet,
          avatar: formData.avatar,
        };

        await onSignup(signupData);
      } else {
        // Login
        const userData = {
          email: formData.email,
          name: formData.name || formData.email.split("@")[0],
          wallet: formData.wallet || "$ilp.interledger-test.dev/default-wallet",
          avatar: formData.avatar,
        };

        if (onLogin) {
          onLogin(userData);
        }
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      wallet: "",
      avatar: "🐶",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#2a2a2a",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            p: 6,
            position: "relative",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
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
                width: 60,
                height: 60,
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                transform: "rotate(-15deg)",
              }}
            >
              <MonetizationOn sx={{ fontSize: 40, color: "#ffd700" }} />
            </Box>

            <Box
              sx={{
                width: 200,
                height: 200,
                bgcolor: "#f4d56f",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 4,
                overflow: "hidden",
              }}
            >
              <Typography sx={{ fontSize: "8rem" }}>
                {!isLoginMode ? formData.avatar : "👨🏻‍💻"}
              </Typography>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <>
                <TextField
                  fullWidth
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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

                <TextField
                  fullWidth
                  placeholder="Wallet Address"
                  name="wallet"
                  value={formData.wallet}
                  onChange={handleChange}
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

                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: "#666",
                  }}
                >
                  Choose your avatar
                </Typography>
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  sx={{ mb: 3 }}
                >
                  {avatarOptions.map((avatar) => (
                    <Grid item xs={3} sm={2} md={1.5} key={avatar}>
                      <Box
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, avatar }))
                        }
                        sx={{
                          bgcolor:
                            formData.avatar === avatar ? "#ffd700" : "#f5f5f5",
                          borderRadius: 2,
                          p: 1.5,
                          textAlign: "center",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          border:
                            formData.avatar === avatar
                              ? "2px solid #000"
                              : "2px solid transparent",
                          "&:hover": {
                            bgcolor:
                              formData.avatar === avatar
                                ? "#ffd700"
                                : "#e8e8e8",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <Typography sx={{ fontSize: "2rem" }}>
                          {avatar}
                        </Typography>
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
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#f5f5f5",
                  "& fieldset": { border: "none" },
                  height: "56px",
                },
              }}
            />

            <TextField
              fullWidth
              placeholder="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              sx={{
                mb: !isLoginMode ? 2 : 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#f5f5f5",
                  "& fieldset": { border: "none" },
                  height: "56px",
                },
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
                ),
              }}
            />

            {!isLoginMode && (
              <TextField
                fullWidth
                placeholder="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
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
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                mb: 2,
                py: 2,
                borderRadius: 10,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                bgcolor: "#e0e0e0",
                color: "#666",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#d5d5d5",
                  boxShadow: "none",
                },
              }}
            >
              {isLoading
                ? "Loading..."
                : isLoginMode
                ? "Sign In"
                : "Create Account"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={toggleMode}
              disabled={isLoading}
              sx={{
                py: 2,
                borderRadius: 10,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                bgcolor: "#e0e0e0",
                color: "#666",
                border: "none",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#d5d5d5",
                  border: "none",
                  boxShadow: "none",
                },
              }}
            >
              {isLoginMode
                ? "Don't have an account?"
                : "Already have an account?"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
