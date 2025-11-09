import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  MonetizationOn,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import AppBottomNavigation from "../components/AppBottomNavigation";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function GroupDetailPage({
  group,
  user,
  onBack,
  onAddService,
  onNavigateToProfile,
  onUpdateGroup,
  userWallet = "wallet-address-1234",
  userBalance: initialBalance = 150.5,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [openPayModal, setOpenPayModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [userBalance, setUserBalance] = useState(initialBalance);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [navigationValue, setNavigationValue] = useState(null);
  const [paidServices, setPaidServices] = useState(new Set());

  // Make sure group has valid structure
  const safeGroup = {
    ...group,
    services: group?.services || [],
    members: group?.members || [],
  };

  const handleNavigationChange = (event, newValue) => {
    setNavigationValue(newValue);
    if (newValue === 1 && onNavigateToProfile) {
      onNavigateToProfile();
    } else if (newValue === 0) {
      onBack();
    }
  };

  // Calculate debts per member
  const calculateDebts = () => {
    if (!safeGroup.services || safeGroup.services.length === 0) return [];

    const confirmedMembers =
      safeGroup.members?.filter((m) => m.status === "confirmed") || [];
    const totalMembers = confirmedMembers.length;

    if (totalMembers === 0) return [];

    return safeGroup.services.map((service) => ({
      ...service,
      amountPerPerson: service.total / totalMembers,
      isPaid: paidServices.has(service.id),
    }));
  };

  const debts = calculateDebts();

  // Calculate only unpaid debts
  const unpaidDebts = debts.filter((d) => !d.isPaid);
  const totalToPay = unpaidDebts.reduce((sum, d) => sum + d.amountPerPerson, 0);

  const handlePay = (service = null) => {
    setSelectedPayment(service);
    setOpenPayModal(true);
    setPaymentSuccess(false);
    setPaymentError("");
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setPaymentError("");

    const amountToPay = selectedPayment
      ? selectedPayment.amountPerPerson
      : totalToPay;

    try {
      // Simulate backend call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check sufficient balance
      if (userBalance < amountToPay) {
        setPaymentError("Insufficient balance");
        setIsProcessing(false);
        return;
      }

      // Update balance
      const newBalance = userBalance - amountToPay;
      setUserBalance(newBalance);

      // Mark services as paid
      if (selectedPayment) {
        setPaidServices((prev) => new Set([...prev, selectedPayment.id]));
      } else {
        // Mark all unpaid services as paid
        setPaidServices((prev) => {
          const newSet = new Set(prev);
          unpaidDebts.forEach((debt) => newSet.add(debt.id));
          return newSet;
        });
      }

      // Update group member status
      if (onUpdateGroup) {
        const updatedMembers = safeGroup.members.map((member) => {
          if (member.email === user.email) {
            return { ...member, hasPaid: true };
          }
          return member;
        });
        onUpdateGroup({ ...safeGroup, members: updatedMembers });
      }

      setPaymentSuccess(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        setOpenPayModal(false);
        setSelectedPayment(null);
        setPaymentSuccess(false);
      }, 2000);
    } catch (error) {
      setPaymentError("Error processing payment. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    if (!isProcessing) {
      setOpenPayModal(false);
      setSelectedPayment(null);
      setPaymentSuccess(false);
      setPaymentError("");
    }
  };

  const amountToPay = selectedPayment
    ? selectedPayment.amountPerPerson
    : totalToPay;
  const newBalance = userBalance - amountToPay;
  const insufficientBalance = newBalance < 0;

  // Check if current user has paid
  const currentUserMember = safeGroup.members.find(
    (m) => m.email === user?.email
  );
  const currentUserHasPaid =
    currentUserMember?.hasPaid || paidServices.size === debts.length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#2a2a2a",
        pb: 10,
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
            color: "#fff",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            ml: 2,
            fontWeight: 500,
          }}
        >
          Group Details
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ px: 3 }}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            overflow: "hidden",
            minHeight: "calc(100vh - 200px)",
          }}
        >
          {/* Group header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 4,
              pb: 2,
              bgcolor: "#fafafa",
            }}
          >
            <MonetizationOn
              sx={{
                fontSize: 40,
                color: "#ffd700",
                mb: 2,
              }}
            />

            <Box
              sx={{
                width: 100,
                height: 100,
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
                {safeGroup.emoji}
              </Typography>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {safeGroup.name}
            </Typography>

            {/* Balance Card */}
            <Card
              sx={{
                mt: 2,
                mx: 3,
                width: "calc(100% - 48px)",
                bgcolor: "#f4d56f",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
                <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                  Your Balance
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#000" }}
                >
                  ${userBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                color: "#666",
                "&.Mui-selected": {
                  color: "#000",
                  fontWeight: 600,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ffd700",
                height: 3,
              },
            }}
          >
            <Tab label="Services" />
            <Tab label="Members" />
            <Tab label="Payments" />
          </Tabs>

          {/* Tab Services */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ px: 3 }}>
              {safeGroup.services && safeGroup.services.length > 0 ? (
                safeGroup.services.map((service) => (
                  <Card
                    key={service.id}
                    sx={{
                      mb: 2,
                      bgcolor: "#f5f5f5",
                      borderRadius: 3,
                      boxShadow: "none",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {service.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                        Total: ${service.total?.toFixed(2) || "0.00"}
                      </Typography>
                      {service.dueDate && (
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          Due: {service.dueDate}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Typography variant="h6" sx={{ color: "#999", mb: 2 }}>
                    No services yet
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAddService}
                    sx={{
                      bgcolor: "#000",
                      "&:hover": { bgcolor: "#333" },
                      textTransform: "none",
                      borderRadius: 2,
                    }}
                  >
                    Add Service
                  </Button>
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* Tab Members */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ px: 3 }}>
              {safeGroup.members && safeGroup.members.length > 0 ? (
                safeGroup.members.map((member) => {
                  const isCurrentUser = member.email === user?.email;
                  const memberHasPaid =
                    member.hasPaid || (isCurrentUser && currentUserHasPaid);
                  const amountOwed = memberHasPaid ? 0 : totalToPay;

                  return (
                    <Card
                      key={member.id}
                      sx={{
                        mb: 2,
                        bgcolor: memberHasPaid ? "#e8f5e9" : "#fff3e0",
                        borderRadius: 3,
                        boxShadow: "none",
                        border: `2px solid ${
                          memberHasPaid ? "#4caf50" : "#ff9800"
                        }`,
                      }}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", py: 2 }}
                      >
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
                            {member.avatar || "👤"}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600 }}
                            >
                              {member.name}
                              {isCurrentUser && " (You)"}
                            </Typography>
                            <Chip
                              label={
                                member.status === "confirmed"
                                  ? "Confirmed"
                                  : "Pending"
                              }
                              size="small"
                              sx={{
                                bgcolor:
                                  member.status === "confirmed"
                                    ? "#4caf50"
                                    : "#ff9800",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.7rem",
                              }}
                            />
                          </Box>
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            {member.email}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: memberHasPaid ? "#4caf50" : "#ff9800",
                            }}
                          >
                            ${amountOwed.toFixed(2)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            {memberHasPaid ? "Paid" : "Owes"}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Typography variant="h6" sx={{ color: "#999" }}>
                    No members yet
                  </Typography>
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* Tab Payments */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ px: 3 }}>
              {debts.length > 0 ? (
                <>
                  <Card
                    sx={{
                      mb: 3,
                      bgcolor: "#f4d56f",
                      borderRadius: 3,
                      boxShadow: "none",
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                        Total to Pay
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        ${totalToPay.toFixed(2)}
                      </Typography>
                      {paidServices.size > 0 && (
                        <Typography
                          variant="body2"
                          sx={{ color: "#4caf50", mt: 1 }}
                        >
                          ✓ {paidServices.size} service
                          {paidServices.size !== 1 ? "s" : ""} paid
                        </Typography>
                      )}
                    </CardContent>
                  </Card>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Breakdown by Service
                  </Typography>

                  {debts.map((service) => (
                    <Card
                      key={service.id}
                      sx={{
                        mb: 2,
                        bgcolor: service.isPaid ? "#e8f5e9" : "#f5f5f5",
                        borderRadius: 3,
                        boxShadow: "none",
                        opacity: service.isPaid ? 0.7 : 1,
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600 }}
                            >
                              {service.name}
                              {service.isPaid && " ✓"}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Your share: ${service.amountPerPerson.toFixed(2)}
                            </Typography>
                          </Box>
                          {!service.isPaid && (
                            <Button
                              variant="contained"
                              onClick={() => handlePay(service)}
                              sx={{
                                bgcolor: "#000",
                                "&:hover": { bgcolor: "#333" },
                                textTransform: "none",
                                borderRadius: 2,
                              }}
                            >
                              Pay
                            </Button>
                          )}
                          {service.isPaid && (
                            <Chip
                              label="Paid"
                              sx={{
                                bgcolor: "#4caf50",
                                color: "white",
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}

                  {unpaidDebts.length > 0 && (
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={() => handlePay(null)}
                      sx={{
                        mt: 2,
                        py: 2,
                        bgcolor: "#ffd700",
                        color: "#000",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#ffed4e" },
                        textTransform: "none",
                        borderRadius: 3,
                        boxShadow: "0 4px 12px rgba(255,215,0,0.3)",
                      }}
                    >
                      Pay All (${totalToPay.toFixed(2)})
                    </Button>
                  )}

                  {unpaidDebts.length === 0 && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      All payments completed! 🎉
                    </Alert>
                  )}
                </>
              ) : (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Typography variant="h6" sx={{ color: "#999" }}>
                    No pending payments
                  </Typography>
                </Box>
              )}
            </Box>
          </TabPanel>
        </Box>
      </Container>

      {/* Payment Modal */}
      <Modal open={openPayModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          {paymentSuccess ? (
            <Box sx={{ textAlign: "center" }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "#4caf50" }}
              >
                Payment Successful!
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: "#666" }}>
                Your payment has been processed
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Confirm Payment
              </Typography>

              {paymentError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {paymentError}
                </Alert>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  Service
                </Typography>
                <Typography variant="h6">
                  {selectedPayment ? selectedPayment.name : "All services"}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Current Balance
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ${userBalance.toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Amount to Pay
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    -${amountToPay.toFixed(2)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    New Balance
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: insufficientBalance ? "#f44336" : "#4caf50",
                    }}
                  >
                    ${newBalance.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handleConfirmPayment}
                disabled={insufficientBalance || isProcessing}
                sx={{
                  mb: 2,
                  py: 1.5,
                  bgcolor: "#000",
                  "&:hover": { bgcolor: "#333" },
                  "&:disabled": {
                    bgcolor: "#e0e0e0",
                    color: "#999",
                  },
                  textTransform: "none",
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                {isProcessing ? (
                  <CircularProgress size={24} sx={{ color: "#999" }} />
                ) : (
                  "PAY"
                )}
              </Button>

              {insufficientBalance && (
                <Button
                  fullWidth
                  variant="outlined"
                  href="https://wallet.interledger-test.dev"
                  target="_blank"
                  sx={{
                    mb: 1,
                    py: 1.5,
                    borderColor: "#ffd700",
                    color: "#000",
                    "&:hover": {
                      borderColor: "#ffed4e",
                      bgcolor: "#fff9e6",
                    },
                    textTransform: "none",
                    borderRadius: 2,
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  Deposit Funds
                </Button>
              )}

              <Button
                fullWidth
                variant="text"
                onClick={handleCloseModal}
                disabled={isProcessing}
                sx={{
                  color: "#666",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Bottom Navigation */}
      <AppBottomNavigation
        value={navigationValue}
        onChange={handleNavigationChange}
      />
    </Box>
  );
}
