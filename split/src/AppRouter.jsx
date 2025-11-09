import React, { useState, useEffect } from "react";
import LoginPage from "./components/auth/LoginPage";
import MainPage from "./pages/MainPage";
import CreateGroupPage from "./pages/CreateGroupPage";
import GroupDetailPage from "./pages/GroupDetailPage";
import ProfilePage from "./pages/ProfilePage";
import apiService from "./services/api";

function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("main");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = apiService.getToken();
      if (token) {
        try {
          const userData = await apiService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Auth check failed:", error);
          apiService.clearToken();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "House",
      emoji: "🏠",
      creatorWallet: "$ilp.interledger-test.dev/creator-wallet",
      services: [
        {
          id: 1,
          name: "Electricity",
          wallet: "$ilp.interledger-test.dev/electricity-wallet",
          total: 150.0,
          dueDate: "2024-12-15",
        },
        {
          id: 2,
          name: "Water",
          wallet: "$ilp.interledger-test.dev/water-wallet",
          total: 80.0,
          dueDate: "2024-12-20",
        },
        {
          id: 3,
          name: "Netflix",
          wallet: "$ilp.interledger-test.dev/netflix-wallet",
          total: 15.0,
          dueDate: "2024-12-10",
        },
      ],
      members: [
        {
          id: 1,
          name: "María García",
          email: "maria@example.com",
          avatar: "🐱",
          status: "confirmed",
          hasPaid: true,
          wallet: "$ilp.interledger-test.dev/maria-wallet",
        },
        {
          id: 2,
          name: "Juan Pérez",
          email: "juan@example.com",
          avatar: "🐶",
          status: "confirmed",
          hasPaid: false,
          wallet: "$ilp.interledger-test.dev/juan-wallet",
        },
      ],
    },
    {
      id: 2,
      name: "Trip",
      emoji: "🏔️",
      creatorWallet: "$ilp.interledger-test.dev/creator-wallet",
      services: [],
      members: [],
    },
  ]);

  const [requests, setRequests] = useState([
    {
      id: 1,
      groupId: 3,
      groupName: "Friends",
      groupEmoji: "🎉",
      invitedBy: "Pedro López",
    },
    {
      id: 2,
      groupId: 4,
      groupName: "Work",
      groupEmoji: "💼",
      invitedBy: "Ana Martínez",
    },
  ]);

  const handleLogin = async (userData) => {
    console.log("✅ Login successful:", userData);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleSignup = async (userData) => {
    try {
      console.log("📝 Signing up:", userData);
      const response = await apiService.signup(userData);
      console.log("✅ Signup successful:", response);
      setIsAuthenticated(true);
      setUser(response.user || userData);
    } catch (error) {
      console.error("❌ Signup failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    console.log("👋 Logging out");
    apiService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage("main");
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#2a2a2a",
        }}
      >
        <p style={{ color: "#fff" }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  if (currentPage === "create") {
    return (
      <CreateGroupPage
        user={user}
        onBack={() => {
          console.log("⬅️ Going back to main from create");
          setCurrentPage("main");
        }}
        onCreate={(newGroup) => {
          console.log("➕ Creating group:", newGroup);

          // Add creator as first member with confirmed status
          const groupWithCreator = {
            id: Date.now(),
            ...newGroup,
            creatorWallet: user.wallet,
            services: newGroup.services || [],
            members: [
              {
                id: Date.now(),
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                status: "confirmed",
                hasPaid: false,
                wallet: user.wallet,
              },
              ...(newGroup.members || []).map((member, index) => ({
                ...member,
                id: Date.now() + index + 1,
                status: "pending",
                hasPaid: false,
              })),
            ],
          };

          setGroups([...groups, groupWithCreator]);
          setCurrentPage("main");
        }}
      />
    );
  }

  if (currentPage === "group-detail") {
    return (
      <GroupDetailPage
        group={selectedGroup}
        user={user}
        onBack={() => {
          console.log("⬅️ Going back to main from detail");
          setCurrentPage("main");
        }}
        onNavigateToProfile={() => {
          console.log("👤 Navigating to profile from group detail");
          setCurrentPage("profile");
        }}
        onAddService={() => {
          console.log("➕ Add service");
        }}
        onUpdateGroup={(updatedGroup) => {
          console.log("🔄 Updating group:", updatedGroup);
          setGroups(
            groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g))
          );
          setSelectedGroup(updatedGroup);
        }}
        userWallet={user?.wallet}
        userBalance={150.5}
      />
    );
  }

  if (currentPage === "profile") {
    return (
      <ProfilePage
        user={user}
        onNavigateToGroups={() => {
          console.log("🏠 Navigating to groups from profile");
          setCurrentPage("main");
        }}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <MainPage
      groups={groups}
      requests={requests}
      onNavigateToCreate={() => {
        console.log("➕ Navigating to create group");
        setCurrentPage("create");
      }}
      onNavigateToProfile={() => {
        console.log("👤 Navigating to profile");
        setCurrentPage("profile");
      }}
      onNavigateToGroup={(group) => {
        console.log("🔍 Navigating to group detail:", group.name);
        setSelectedGroup(group);
        setCurrentPage("group-detail");
      }}
      onAcceptRequest={(request) => {
        console.log("✅ Accepting request:", request.groupName);
        const newGroup = {
          id: request.groupId,
          name: request.groupName,
          emoji: request.groupEmoji,
          creatorWallet: "$ilp.interledger-test.dev/unknown-wallet",
          services: [],
          members: [
            {
              id: Date.now(),
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              status: "confirmed",
              hasPaid: false,
              wallet: user.wallet,
            },
          ],
        };
        setGroups([...groups, newGroup]);
        setRequests(requests.filter((r) => r.id !== request.id));
      }}
      onRejectRequest={(request) => {
        console.log("❌ Rejecting request:", request.groupName);
        setRequests(requests.filter((r) => r.id !== request.id));
      }}
    />
  );
}

export default AppRouter;
