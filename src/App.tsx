/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, signInWithGoogle, logout, handleFirestoreError, OperationType } from './firebase';
import { UserProfile, Language, AppState } from './types';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { OnboardingFlow } from './components/OnboardingFlow';
import { AppContent } from './components/AppContent';
import { Loading } from './components/Loading';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [state, setState] = useState<AppState>({
    user: null,
    loading: true,
    language: 'en',
    currentDayPlan: null,
    history: [],
  });

  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, fetch profile from Firestore
        const userRef = doc(db, 'users', user.uid);
        
        // Use onSnapshot for real-time updates
        const unsubProfile = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const profile = docSnap.data() as UserProfile;
            setState(prev => ({
              ...prev,
              user: profile,
              language: profile.language,
              loading: false,
            }));
          } else {
            // New user, trigger onboarding
            setState(prev => ({
              ...prev,
              user: {
                uid: user.uid,
                displayName: user.displayName || 'User',
                email: user.email || '',
                photoURL: user.photoURL || undefined,
                language: 'en',
                theme: 'dark',
                onboardingCompleted: false,
                emotionalType: 'Unknown',
                scores: { anxiety: 0, jealousy: 0, overthinking: 0 },
                streak: 0,
                createdAt: new Date().toISOString(),
              },
              loading: false,
            }));
          }
          setIsAuthReady(true);
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
          setState(prev => ({ ...prev, loading: false }));
        });

        return () => unsubProfile();
      } else {
        // User is signed out
        setState(prev => ({
          ...prev,
          user: null,
          loading: false,
        }));
        setIsAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateUser = async (updates: Partial<UserProfile>) => {
    if (!state.user) return;
    const userRef = doc(db, 'users', state.user.uid);
    try {
      if (!state.user.onboardingCompleted && updates.onboardingCompleted) {
        // First time saving profile
        await setDoc(userRef, { ...state.user, ...updates });
      } else {
        await updateDoc(userRef, updates);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${state.user.uid}`);
    }
  };

  const handleOnboardingComplete = async (profileUpdates: Partial<UserProfile>) => {
    await handleUpdateUser(profileUpdates);
  };

  if (state.loading || !isAuthReady) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <Layout lang={state.language} theme={state.user?.theme || 'dark'}>
        {!state.user ? (
          <Login onLogin={signInWithGoogle} lang={state.language} />
        ) : !state.user.onboardingCompleted ? (
          <OnboardingFlow onComplete={handleOnboardingComplete} initialLang={state.language} />
        ) : (
          <AppContent 
            user={state.user} 
            onUpdateUser={handleUpdateUser} 
            onLogout={logout}
            onDeleteAccount={() => {
              // In a real app, we'd show a custom modal here.
              // For now, we'll just logout to simulate the action safely.
              logout();
            }}
          />
        )}
      </Layout>
    </ErrorBoundary>
  );
}
