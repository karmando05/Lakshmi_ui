"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  clearMockSession,
  restoreMockSession,
  saveMockSession,
  validateMockCredentials,
  type AuthenticatedUser,
} from "../../lib/auth/mock-auth";
import { type MockUserRole } from "../../lib/data/mock/users";

type AuthContextValue = {
  currentUser: AuthenticatedUser | null;
  isAuthenticated: boolean;
  role: MockUserRole | null;
  isReady: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sessionUser = restoreMockSession();
    setCurrentUser(sessionUser);
    setIsReady(true);
  }, []);

  function login(email: string, password: string): boolean {
    const matchedUser = validateMockCredentials(email, password);

    if (!matchedUser) {
      return false;
    }

    saveMockSession(matchedUser);
    setCurrentUser(matchedUser);
    return true;
  }

  function logout(): void {
    clearMockSession();
    setCurrentUser(null);
  }

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      role: currentUser?.role ?? null,
      isReady,
      login,
      logout,
    }),
    [currentUser, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
