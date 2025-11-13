import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import PhoneAuth from '@/components/PhoneAuth';
import Dashboard from '@/components/Dashboard';

export default function Index() {
  const [stage, setStage] = useState<'loading' | 'auth' | 'dashboard'>('loading');

  useEffect(() => {
    const phone = localStorage.getItem('auth_phone');
    if (phone) {
      setStage('loading');
      setTimeout(() => setStage('dashboard'), 3000);
    }
  }, []);

  if (stage === 'loading') {
    return <LoadingScreen onComplete={() => {
      const phone = localStorage.getItem('auth_phone');
      setStage(phone ? 'dashboard' : 'auth');
    }} />;
  }

  if (stage === 'auth') {
    return <PhoneAuth onSuccess={() => setStage('dashboard')} />;
  }

  return <Dashboard />;
}
