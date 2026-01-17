import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface IUserProfile {
  id: string;
  academy: string | null;
  position: string | null;
  role: string | null;
}

interface ICurrentUser {
  id: string;
  name: string;
  email: string;
  academy: string;
  position: string;
  role: string;
}

const deriveDisplayName = (user: User | null) => {
  if (!user?.email) {
    return '사용자';
  }
  if (typeof user.user_metadata?.name === 'string' && user.user_metadata.name.trim()) {
    return user.user_metadata.name.trim();
  }
  return user.email.split('@')[0];
};

const normalizeProfile = (profile: IUserProfile | null, user: User | null): ICurrentUser | null => {
  if (!user?.email) {
    return null;
  }
  return {
    id: user.id,
    name: deriveDisplayName(user),
    email: user.email,
    academy: profile?.academy ?? '',
    position: profile?.position ?? '',
    role: profile?.role ?? 'user'
  };
};

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('id, academy, position, role')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) {
      setError(profileError.message);
      return null;
    }
    return data as IUserProfile | null;
  }, []);

  const syncSession = useCallback(
    async (nextSession: Session | null) => {
      setSession(nextSession);
      if (!nextSession?.user) {
        setProfile(null);
        return;
      }
      const profileData = await fetchProfile(nextSession.user.id);
      setProfile(profileData);
    },
    [fetchProfile]
  );

  useEffect(() => {
    let isMounted = true;
    const initialize = async () => {
      setIsLoading(true);
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (sessionError) {
        setError(sessionError.message);
      }
      await syncSession(data.session ?? null);
      if (isMounted) {
        setIsLoading(false);
      }
    };

    initialize();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      syncSession(nextSession);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [syncSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (signInError) {
      setError(signInError.message);
    }
    return signInError;
  }, []);

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    setError(null);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name ?? ''
        }
      }
    });
    if (signUpError) {
      setError(signUpError.message);
      return signUpError;
    }
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        academy: '',
        position: '',
        role: 'user'
      });
      if (profileError) {
        setError(profileError.message);
      }
    }
    return signUpError;
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
    }
    return signOutError;
  }, []);

  const currentUser = useMemo(() => normalizeProfile(profile, session?.user ?? null), [profile, session]);
  const isAdmin = currentUser?.role === 'admin';

  return {
    session,
    currentUser,
    isAdmin,
    isLoading,
    error,
    signIn,
    signUp,
    signOut
  };
}
