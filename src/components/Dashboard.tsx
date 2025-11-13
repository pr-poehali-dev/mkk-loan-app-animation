import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import LoanApplication from './LoanApplication';
import ClientData from './ClientData';
import LoanHistory from './LoanHistory';
import Help from './Help';

interface Loan {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  date: string;
}

export default function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [loans] = useState<Loan[]>([
    { id: '1', amount: 15000, status: 'active', date: '2024-11-01' },
    { id: '2', amount: 10000, status: 'completed', date: '2024-10-15' },
    { id: '3', amount: 20000, status: 'pending', date: '2024-11-10' },
  ]);

  const phone = localStorage.getItem('auth_phone') || '';
  const gender = localStorage.getItem('user_gender') || 'male';
  const avatar = gender === 'female' ? '👩' : '👨';

  const handleLogout = () => {
    localStorage.removeItem('auth_phone');
    window.location.reload();
  };

  const getStatusBadge = (status: Loan['status']) => {
    const variants: Record<Loan['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; text: string }> = {
      pending: { variant: 'outline', text: 'На рассмотрении' },
      approved: { variant: 'default', text: 'Одобрено' },
      rejected: { variant: 'destructive', text: 'Отклонено' },
      active: { variant: 'default', text: 'Активный' },
      completed: { variant: 'secondary', text: 'Завершен' },
    };
    const { variant, text } = variants[status];
    return <Badge variant={variant}>{text}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-2 shadow-md">
              <Icon name="Home" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Деньги в Дом</h1>
              <p className="text-xs text-muted-foreground">{phone}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowMenu(!showMenu)}>
            <Icon name="Menu" className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {showMenu && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowMenu(false)}>
          <div className="bg-white w-80 h-full ml-auto p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Меню</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowMenu(false)}>
                <Icon name="X" className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="text-5xl">
                {avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium">{phone}</p>
                <p className="text-sm text-muted-foreground">Клиент</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab('home');
                  setShowMenu(false);
                }}
              >
                <Icon name="Home" className="w-5 h-5 mr-3" />
                Главная
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab('profile');
                  setShowMenu(false);
                }}
              >
                <Icon name="User" className="w-5 h-5 mr-3" />
                Данные клиента
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab('history');
                  setShowMenu(false);
                }}
              >
                <Icon name="History" className="w-5 h-5 mr-3" />
                История заявок
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab('help');
                  setShowMenu(false);
                }}
              >
                <Icon name="HelpCircle" className="w-5 h-5 mr-3" />
                Помощь
              </Button>
              <Separator className="my-4" />
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive"
                onClick={handleLogout}
              >
                <Icon name="LogOut" className="w-5 h-5 mr-3" />
                Выйти
              </Button>
            </nav>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="home" className="m-0">
          <div className="p-4 space-y-4">
            <Card className="bg-gradient-to-br from-primary via-accent to-secondary text-white p-6 shadow-xl border-0 gradient-animate">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/90 text-sm mb-1 font-medium">Доступный лимит</p>
                  <h2 className="text-4xl font-bold drop-shadow-lg">50 000 ₽</h2>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                  <Icon name="Wallet" className="w-12 h-12 text-white" />
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
                size="lg"
                onClick={() => setActiveTab('new-loan')}
              >
                Оформить займ
              </Button>
            </Card>

            <div>
              <h3 className="font-semibold mb-3 px-1">Активные заявки</h3>
              <div className="space-y-3">
                {loans.filter(l => l.status === 'active' || l.status === 'pending').map(loan => (
                  <Card key={loan.id} className="p-4 hover:shadow-md transition-shadow border-l-4 border-l-primary">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-2">
                          <Icon name="Banknote" className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{loan.amount.toLocaleString()} ₽</p>
                          <p className="text-sm text-muted-foreground">{loan.date}</p>
                        </div>
                      </div>
                      {getStatusBadge(loan.status)}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="new-loan" className="m-0">
          <LoanApplication onBack={() => setActiveTab('home')} />
        </TabsContent>

        <TabsContent value="profile" className="m-0">
          <ClientData />
        </TabsContent>

        <TabsContent value="history" className="m-0">
          <LoanHistory loans={loans} getStatusBadge={getStatusBadge} />
        </TabsContent>

        <TabsContent value="help" className="m-0">
          <Help />
        </TabsContent>
      </Tabs>
    </div>
  );
}