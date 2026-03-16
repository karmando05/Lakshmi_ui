import { MOCK_USERS, type MockUser } from "../data/mock/users";

const MOCK_CREATED_USERS_STORAGE_KEY = "lakshmi:admin:created-users";

function canUseBrowserStorage(): boolean {
  return typeof window !== "undefined";
}

function readCreatedUsers(): MockUser[] {
  if (!canUseBrowserStorage()) {
    return [];
  }

  const rawUsers = localStorage.getItem(MOCK_CREATED_USERS_STORAGE_KEY);

  if (!rawUsers) {
    return [];
  }

  try {
    const parsedUsers = JSON.parse(rawUsers) as MockUser[];
    if (!Array.isArray(parsedUsers)) {
      return [];
    }

    return parsedUsers;
  } catch {
    localStorage.removeItem(MOCK_CREATED_USERS_STORAGE_KEY);
    return [];
  }
}

function writeCreatedUsers(users: MockUser[]): void {
  if (!canUseBrowserStorage()) {
    return;
  }

  localStorage.setItem(MOCK_CREATED_USERS_STORAGE_KEY, JSON.stringify(users));
}

export function getAllMockUsers(): MockUser[] {
  const createdUsers = readCreatedUsers();
  return [...MOCK_USERS, ...createdUsers];
}

export function createMockUser(user: MockUser): void {
  const createdUsers = readCreatedUsers();
  writeCreatedUsers([user, ...createdUsers]);
}

export function isEmailTaken(email: string): boolean {
  const normalizedEmail = email.trim().toLowerCase();

  return getAllMockUsers().some((user) => user.email.toLowerCase() === normalizedEmail);
}

export function generateMockUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getInitialsAvatar(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "NU";
}
