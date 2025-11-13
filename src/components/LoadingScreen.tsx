import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [money, setMoney] = useState<{ id: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    const moneyItems = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setMoney(moneyItems);

    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary to-green-600 flex flex-col items-center justify-center z-50 overflow-hidden">
      {money.map((item) => (
        <div
          key={item.id}
          className="absolute text-4xl animate-money-fall"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
          }}
        >
          💵
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="bg-white rounded-full p-6 shadow-2xl animate-pulse-scale">
          <Icon name="Home" className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-white text-center px-4">
          Деньги в Дом
        </h1>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
