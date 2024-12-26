'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAuthSession, JWT } from '@aws-amplify/auth';
import { useRouter } from 'next/navigation';

type User = {
  idToken: JWT;
  accessToken: JWT;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const session = await fetchAuthSession();
        if (session?.tokens?.idToken && session?.tokens?.accessToken) {
          setUser({
            idToken: session.tokens.idToken,
            accessToken: session.tokens.accessToken,
          });
        } else {
          console.error('Sessão inválida ou incompleta');
          setUser(null);
          router.push('/');
        }
      } catch (error) {
        console.error('Usuário não autenticado:', error);
        setUser(null);
        router.push('/'); // Redireciona para a página inicial se não autenticado
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const signOut = async () => {
    try {
      await fetchAuthSession({ forceRefresh: true }); // Atualiza tokens antes do logout, se necessário
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
