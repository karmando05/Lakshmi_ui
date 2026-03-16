import { MOCK_AUTH_STORAGE_KEY } from "../data/mock/session";
import { MOCK_USERS, type MockUser } from "../data/mock/users";

export type AuthenticatedUser = Omit<MockUser, "password">;

function toAuthenticatedUser(user: MockUser): AuthenticatedUser {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function validateMockCredentials(
  email: string,
  password: string,
): AuthenticatedUser | null {
  const normalizedEmail = email.trim().toLowerCase();

  const matchedUser = MOCK_USERS.find(
    (user) => user.email.toLowerCase() === normalizedEmail && user.password === password,
  );

  if (!matchedUser) {
    return null;
  }

  return toAuthenticatedUser(matchedUser);
}

export function saveMockSession(user: AuthenticatedUser): void {
  localStorage.setItem(MOCK_AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function restoreMockSession(): AuthenticatedUser | null {
  const rawSession = localStorage.getItem(MOCK_AUTH_STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthenticatedUser;
  } catch {
    localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
    return null;
  }
}

export function clearMockSession(): void {
  localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
}
