import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  authenticate,
  ensureSeedData,
  getSession,
  setSession,
} from "./store";
import type { Session } from "./types";

type AuthContextValue = {
  session: Session | null;
  login: (email: string, password: string) => Session | null;
  logout: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setLocalSession] = useState<Session | null>(null);

  useEffect(() => {
    ensureSeedData();
    setLocalSession(getSession());
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      login: (email, password) => {
        const next = authenticate(email, password);
        setLocalSession(next);
        return next;
      },
      logout: () => {
        setSession(null);
        setLocalSession(null);
      },
      refresh: () => setLocalSession(getSession()),
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
