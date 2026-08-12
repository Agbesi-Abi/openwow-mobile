import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getItem, setItem, removeItem } from '@/src/services/storage';
import type { User } from '@/src/types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'openwow_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { loadUser(); }, []);

  async function loadUser() {
    try { const s = await getItem(STORAGE_KEY); if (s) setUser(JSON.parse(s)); } catch { /* ignore */ } finally { setIsLoading(false); }
  }

  async function signIn(email: string, _password: string) {
    await new Promise((r) => setTimeout(r, 400));
    const u: User = { id: 'user-1', name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1), email };
    setUser(u); await setItem(STORAGE_KEY, JSON.stringify(u));
  }

  async function signUp(name: string, email: string, _password: string) {
    await new Promise((r) => setTimeout(r, 400));
    const u: User = { id: 'user-1', name, email };
    setUser(u); await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  }

  async function signOut() { setUser(null); await removeItem(STORAGE_KEY); }
  async function updateProfile(updates: Partial<User>) {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated); await setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateProfile }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
