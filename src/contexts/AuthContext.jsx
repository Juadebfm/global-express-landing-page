import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { userApi } from "../api/userApi";
import {
  AUTH_TOKEN_STORAGE_KEY,
  CLERK_SYNC_CONFLICT_MESSAGE,
} from "../constants/auth";
import { AuthContext } from "./auth-context";

const resolveCurrentUser = (payload) => {
  if (!payload) return null;
  if (payload.data && typeof payload.data === "object") return payload.data;
  return payload;
};

const resolveAuthUser = (payload) => {
  if (!payload) return null;
  if (payload.user && typeof payload.user === "object") return payload.user;
  if (payload.data?.user && typeof payload.data.user === "object") return payload.data.user;
  return null;
};

const resolveAccessToken = (payload) =>
  payload?.tokens?.accessToken || payload?.data?.tokens?.accessToken || null;

const resolvePermissions = (payload, authUser) => {
  if (payload?.permissions && typeof payload.permissions === "object") {
    return payload.permissions;
  }
  if (payload?.data?.permissions && typeof payload.data.permissions === "object") {
    return payload.data.permissions;
  }
  if (authUser?.permissions && typeof authUser.permissions === "object") {
    return authUser.permissions;
  }
  if (authUser?.permissionFlags && typeof authUser.permissionFlags === "object") {
    return authUser.permissionFlags;
  }
  return {};
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
      if (token) {
        const response = await userApi.getCurrentUser();
        const currentUser = resolveCurrentUser(response);
        setUser(currentUser);
        setPermissions(resolvePermissions(response, currentUser));
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      setUser(null);
      setPermissions({});
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.login(credentials);
      const accessToken = resolveAccessToken(data);
      const authUser = resolveAuthUser(data);

      if (accessToken) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, accessToken);
      }

      setUser(authUser);
      setPermissions(resolvePermissions(data, authUser));
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    const registrationMovedError = new Error(
      "Customer registration is now handled via Clerk on the dashboard. Use the Sign up link to continue."
    );
    setError(registrationMovedError.message);
    throw registrationMovedError;
  };

  const syncClerkSession = async (clerkToken) => {
    try {
      setLoading(true);
      setError(null);

      if (!clerkToken) {
        throw new Error("Missing Clerk bearer token.");
      }

      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, clerkToken);
      const syncResponse = await userApi.syncAuth(clerkToken);
      const profileResponse = await userApi.getCurrentUser();
      const currentUser = resolveCurrentUser(profileResponse) || resolveAuthUser(syncResponse);

      setUser(currentUser);
      setPermissions(resolvePermissions(profileResponse, currentUser));
      return {
        syncResponse,
        profileResponse,
      };
    } catch (err) {
      if (err.response?.status === 409) {
        setError(CLERK_SYNC_CONFLICT_MESSAGE);
      } else {
        setError(err.response?.data?.message || err.message || "Authentication sync failed");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await userApi.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
      setUser(null);
      setPermissions({});
    }
  };

  const value = useMemo(
    () => ({
      user,
      permissions,
      loading,
      error,
      login,
      register,
      syncClerkSession,
      logout,
      isAuthenticated: !!user,
    }),
    [user, permissions, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
