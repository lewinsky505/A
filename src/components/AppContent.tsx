/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, DayPlan, Language } from '../types';
import { Dashboard } from './Dashboard';
import { Navigation } from './Navigation';
import { Profile } from './Profile';
import { Settings } from './Settings';
import { ProgressTracker } from './ProgressTracker';
import { EmergencyButton } from './EmergencyButton';
import { EmergencyOverlay } from './EmergencyOverlay';
import { ChatInterface } from './ChatInterface';
import { CheckInOverlay } from './CheckInOverlay';
import { ReflectionOverlay } from './ReflectionOverlay';
import { SEVEN_DAY_PLAN_TEMPLATE } from '../constants';

interface AppContentProps {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export function AppContent({ user, onUpdateUser, onLogout, onDeleteAccount }: AppContentProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'settings' | 'profile'>('home');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isReflectionOpen, setIsReflectionOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<DayPlan>(SEVEN_DAY_PLAN_TEMPLATE[0]);
  const [history, setHistory] = useState<DayPlan[]>([]);

  // Load plan and history from Firestore
  useEffect(() => {
    if (!user.uid) return;

    // Load history
    const historyRef = collection(db, 'users', user.uid, 'history');
    const q = query(historyRef, orderBy('dayNumber', 'desc'));
    
    const unsubHistory = onSnapshot(q, (snapshot) => {
      const historyData = snapshot.docs.map(doc => doc.data() as DayPlan);
      setHistory(historyData);

      // Determine current plan based on history
      if (historyData.length > 0) {
        const lastCompletedDay = Math.max(...historyData.filter(p => p.completed).map(p => p.dayNumber));
        if (lastCompletedDay < 7) {
          // Check if there's an active plan for the next day
          const nextDayNum = lastCompletedDay + 1;
          const activePlan = historyData.find(p => p.dayNumber === nextDayNum);
          if (activePlan) {
            setCurrentPlan(activePlan);
          } else {
            setCurrentPlan(SEVEN_DAY_PLAN_TEMPLATE[nextDayNum - 1]);
          }
        } else {
          // All days completed, show day 7 as completed or a reset state
          setCurrentPlan(historyData.find(p => p.dayNumber === 7) || SEVEN_DAY_PLAN_TEMPLATE[6]);
        }
      } else {
        setCurrentPlan(SEVEN_DAY_PLAN_TEMPLATE[0]);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/history`);
    });

    // Check if check-in is needed
    const today = new Date().toISOString().split('T')[0];
    if (user.lastCheckIn !== today) {
      setIsCheckInOpen(true);
    }

    return () => unsubHistory();
  }, [user.uid, user.lastCheckIn]);

  const handleTaskToggle = async (taskId: string) => {
    const updatedTasks = currentPlan.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const updatedPlan = { ...currentPlan, tasks: updatedTasks, userId: user.uid };
    
    // Check if all tasks are completed to trigger reflection
    const allCompleted = updatedTasks.every(t => t.completed);
    if (allCompleted && !currentPlan.completed) {
      setIsReflectionOpen(true);
    }

    setCurrentPlan(updatedPlan);
    
    // Save progress to Firestore
    try {
      const planRef = doc(db, 'users', user.uid, 'history', `day_${updatedPlan.dayNumber}`);
      await setDoc(planRef, updatedPlan);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/history/day_${updatedPlan.dayNumber}`);
    }
  };

  const handleReflectionComplete = async (answer: string) => {
    const updatedPlan = { ...currentPlan, reflectionAnswer: answer, completed: true, userId: user.uid };
    setCurrentPlan(updatedPlan);
    setIsReflectionOpen(false);

    // Save to Firestore
    try {
      const planRef = doc(db, 'users', user.uid, 'history', `day_${updatedPlan.dayNumber}`);
      await setDoc(planRef, updatedPlan);
      
      // Move to next day if available
      if (updatedPlan.dayNumber < 7) {
        const nextDay = { ...SEVEN_DAY_PLAN_TEMPLATE[updatedPlan.dayNumber], userId: user.uid };
        setCurrentPlan(nextDay);
        const nextPlanRef = doc(db, 'users', user.uid, 'history', `day_${nextDay.dayNumber}`);
        await setDoc(nextPlanRef, nextDay);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/history/day_${updatedPlan.dayNumber}`);
    }
  };

  const handleCheckInComplete = (status: string) => {
    const today = new Date().toISOString().split('T')[0];
    onUpdateUser({ 
      lastCheckIn: today,
      streak: user.lastCheckIn === today ? user.streak : user.streak + 1
    });
  };

  return (
    <div className="relative min-h-screen">
      {activeTab === 'home' && (
        <Dashboard 
          user={user} 
          currentPlan={currentPlan} 
          lang={user.language} 
          onTaskToggle={handleTaskToggle}
          onOpenChat={() => setIsChatOpen(true)}
        />
      )}
      {activeTab === 'chat' && (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Chat History</h2>
          <p className="text-blue-200/50">Your conversations with the AI coach are private and secure.</p>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-bold"
          >
            Start New Chat
          </button>
        </div>
      )}
      {activeTab === 'profile' && (
        <Profile 
          user={user} 
          lang={user.language} 
          onLogout={onLogout} 
          onDeleteAccount={onDeleteAccount}
          onLanguageToggle={() => onUpdateUser({ language: user.language === 'en' ? 'ar' : 'en' })}
          onThemeToggle={() => onUpdateUser({ theme: user.theme === 'light' ? 'dark' : 'light' })}
        />
      )}
      {activeTab === 'settings' && (
        <Settings lang={user.language} />
      )}

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} lang={user.language} />
      
      <EmergencyButton onClick={() => setIsEmergencyOpen(true)} />
      
      <EmergencyOverlay 
        isOpen={isEmergencyOpen} 
        onClose={() => setIsEmergencyOpen(false)} 
        lang={user.language} 
      />
      
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        lang={user.language} 
        emotionalType={user.emotionalType}
      />

      <CheckInOverlay 
        isOpen={isCheckInOpen} 
        onClose={() => setIsCheckInOpen(false)} 
        onComplete={handleCheckInComplete}
        lang={user.language}
      />

      <ReflectionOverlay 
        isOpen={isReflectionOpen} 
        onClose={() => setIsReflectionOpen(false)} 
        onComplete={handleReflectionComplete}
        currentPlan={currentPlan}
        lang={user.language}
      />
    </div>
  );
}
