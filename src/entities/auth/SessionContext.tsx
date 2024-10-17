import type { Session } from '@supabase/supabase-js';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import supabaseClient from 'shared/supabase';

// import type { Database } from 'shared/supabase/database.types';

// type UserInfo = Database['public']['Tables']['profiles']['Row'];

const SessionContext = createContext<{
  session: Session | null;
  signOut: () => void;
}>({
  session: null,
  signOut: () => {},
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

type Props = { children: React.ReactNode };
export const SessionProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    // const setData = async () => {
    //   const {
    //     data: { session },
    //     error,
    //   } = await supabaseClient.auth.getSession();
    //   if (error) {
    //     throw new Error(error.message);
    //   }
    //   setSession(session);
    // };
    //async로 쓸 경우 동작 일부 안됨
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
      },
    );

    // setData();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        signOut: () => supabaseClient.auth.signOut(),
      }}
    >
      {!isLoading && children}
    </SessionContext.Provider>
  );
};
