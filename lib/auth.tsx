'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName || firebaseUser.email!.split('@')[0]
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user && name) {
        await updateProfile(userCredential.user, { displayName: name });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to register');
      } else {
        setError('Failed to register');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to login');
      } else {
        setError('Failed to login');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to logout');
      } else {
        setError('Failed to logout');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    error,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
